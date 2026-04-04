"use client";

import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function DashboardClient({
  totalUsers,
  internships,
  applications,
  latestUsers,
  latestApplications,
  topInternships,
  userData,
  appData
}: any) {

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* METRIC CARDS */}

      <div className="grid grid-cols-4 gap-6">

        <Card title="Total Users" value={totalUsers} link="/admin/users"/>

        <Card title="Active Internships" value={internships} link="/admin/internships"/>

        <Card title="Applications" value={applications} link="/admin/applications"/>

        <Card title="Visitors" value="0" link="/admin/analytics"/>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-6">

        {/* USER GROWTH */}

        <div className="bg-white border rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            User Growth
          </h2>

          <ResponsiveContainer width="100%" height={250}>

            <LineChart data={userData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* APPLICATION GROWTH */}

        <div className="bg-white border rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            Application Growth
          </h2>

          <ResponsiveContainer width="100%" height={250}>

            <LineChart data={appData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#16a34a"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* TOP INTERNSHIPS */}

      <div className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Top Internships
        </h2>

        {topInternships.map((internship:any)=>(
          <div key={internship.id} className="flex justify-between border-b py-2">

            <span>{internship.title}</span>

            <span className="text-gray-500 text-sm">
              {internship.applications.length} applications
            </span>

          </div>
        ))}

      </div>


      {/* RECENT USERS */}

      <div className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Recent Users
        </h2>

        {latestUsers.map((user:any)=>(
          <div key={user.id} className="flex justify-between border-b py-2">

            <span>{user.name || "User"}</span>

            <span className="text-gray-500 text-sm">
              {user.email}
            </span>

          </div>
        ))}

      </div>


      {/* RECENT APPLICATIONS */}

      <div className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Recent Applications
        </h2>

        {latestApplications.map((app:any)=>(
          <div key={app.id} className="flex justify-between border-b py-2">

            <span>{app.user.name || "User"}</span>

            <span className="text-gray-500 text-sm">
              {app.internship.title}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}


function Card({title,value,link}:any){

  return(

    <Link href={link}>

      <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer">

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

    </Link>

  )

}