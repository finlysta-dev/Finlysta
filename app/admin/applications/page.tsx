import prisma from "@/lib/prisma";
import StatusButtons from "./StatusButtons";

export const dynamic = "force-dynamic";

export default async function AdminApplications() {

  const applications = await prisma.internshipApplication.findMany({
    include: {
      user: true,
      internship: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div>

      <h1 className="text-2xl font-bold mb-8">
        Applications
      </h1>

      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Internship</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Applied</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {applications.map((app: any) => (

              <tr
                key={app.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {app.user?.name || "Student"}
                </td>

                <td className="p-4">
                  {app.user?.email}
                </td>

                <td className="p-4">
                  {app.internship?.title}
                </td>

                <td className="p-4">
                  {app.status}
                </td>

                <td className="p-4">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <StatusButtons id={app.id} />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}