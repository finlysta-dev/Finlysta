import prisma from "@/lib/prisma";

export default async function AdminAnalytics() {

  const users = await prisma.user.count();

  const applications = await prisma.internshipApplication.count();

  const views = await prisma.internshipView.count();

  const applyClicks = await prisma.applyClick.count();

  const internships = await prisma.internship.count();

  return (
    <div>

      <h1 className="text-2xl font-bold mb-8">
        Platform Analytics
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">{users}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Internships</p>
          <h2 className="text-3xl font-bold">{internships}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Applications</p>
          <h2 className="text-3xl font-bold">{applications}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Internship Views</p>
          <h2 className="text-3xl font-bold">{views}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Apply Clicks</p>
          <h2 className="text-3xl font-bold">{applyClicks}</h2>
        </div>

      </div>

    </div>
  );
}