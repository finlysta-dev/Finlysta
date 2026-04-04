import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminSessionGuard from "./AdminSessionGuard";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let totalUsers = 0;
  let totalInternships = 0;
  let totalApplications = 0;
  let totalVisitors = 0;
  let todaysVisitors = 0;
  let error = null;

  try {
    // Count all records
    const [usersCount, internshipsCount, applicationsCount, visitorsCount] = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.internship.count().catch(() => 0),
      prisma.internshipApplication.count().catch(() => 0),
      prisma.visitor.count().catch(() => 0)
    ]);
    
    totalUsers = usersCount;
    totalInternships = internshipsCount;
    totalApplications = applicationsCount;
    totalVisitors = visitorsCount;

    // Count today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    todaysVisitors = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    }).catch(() => 0);

  } catch (err) {
    console.error("Database error:", err);
    error = "Failed to connect to database";
  }

  // Get latest users
  let latestUsers: any[] = [];
  try {
    latestUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }

  // Get latest applications with relations
  let latestApplications: any[] = [];
  try {
    latestApplications = await prisma.internshipApplication.findMany({
      take: 5,
      include: {
        user: true,
        internship: true
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
  }

  if (error) {
    return (
      <div className="space-y-10">
        <AdminSessionGuard />
        
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome Gagandeep Singh 👋
          </h1>
          <p className="text-slate-500 text-sm">
            You are logged in as{" "}
            <span className="font-semibold">Internify Admin</span>.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-600 mb-2">Database Connection Error</p>
          <p className="text-sm text-gray-600">Unable to connect to the database. Please check your connection settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <AdminSessionGuard />

      {/* Welcome Message */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome Gagandeep Singh 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          You are logged in as{" "}
          <span className="font-semibold">Internify Admin</span>. Manage users,
          internships and applications from here.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          link="/admin/users" 
          icon="👥"
        />
        <StatCard 
          title="Active Internships" 
          value={totalInternships} 
          link="/admin/internships"
          icon="💼"
        />
        <StatCard 
          title="Applications" 
          value={totalApplications} 
          link="/admin/applications"
          icon="📝"
        />
        <StatCard 
          title="Visitors" 
          value={totalVisitors} 
          link="/admin/analytics"
          icon="👁️"
          subtext={`${todaysVisitors} today`}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>

          {latestUsers.length > 0 ? (
            <div className="space-y-3">
              {latestUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm py-8 text-center">No users found</p>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Applications</h2>
            <Link href="/admin/applications" className="text-sm text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>

          {latestApplications.length > 0 ? (
            <div className="space-y-3">
              {latestApplications.map((app: any) => (
                <div key={app.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{app.user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{app.internship?.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-sm">
                No applications yet. They will appear here when users apply.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionLink 
            href="/admin/internships/new" 
            icon="➕" 
            title="Add Internship" 
            description="Create a new internship posting"
          />
          <QuickActionLink 
            href="/admin/users" 
            icon="👥" 
            title="Manage Users" 
            description="View and manage user accounts"
          />
          <QuickActionLink 
            href="/admin/applications" 
            icon="📊" 
            title="Review Applications" 
            description="Check pending applications"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  link, 
  icon,
  subtext 
}: { 
  title: string; 
  value: number | string; 
  link: string;
  icon: string;
  subtext?: string;
}) {
  return (
    <Link href={link}>
      <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer hover:border-blue-200 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
          </div>
          <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
        </div>
      </div>
    </Link>
  );
}

function QuickActionLink({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
  return (
    <Link href={href} className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}