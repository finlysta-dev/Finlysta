import prisma from "@/lib/prisma";
import UserActions from "./UserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      applications: true
    }
  });

  return (

    <div>

      {/* Page Title */}

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      {/* Search Bar */}

      <input
        placeholder="Search users..."
        className="border px-4 py-2 rounded mb-6 w-80"
      />

      {/* Users Table */}

      <div className="bg-white shadow-sm border rounded-xl overflow-hidden">

        <table className="w-full">

          {/* Table Head */}

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="p-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Joined
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Applications
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {users.map((user: any) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4">
                  {user.name || "User"}
                </td>

                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                <td className="p-4 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {user.applications.length}
                </td>

                <td className="p-4">

                  {user.isBanned ? (
                    <span className="text-red-600 text-sm">
                      Banned
                    </span>
                  ) : (
                    <span className="text-green-600 text-sm">
                      Active
                    </span>
                  )}

                </td>

                <td className="p-4">

                  <UserActions
                    id={user.id}
                    banned={user.isBanned}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
