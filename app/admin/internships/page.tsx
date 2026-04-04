import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import TrendingButton from "./TrendingButton";

export const dynamic = "force-dynamic";

export default async function AdminInternships() {
  const internships = await prisma.internship.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Internships</h1>
          <p className="text-gray-500 text-sm">
            Manage all internships on Internify
          </p>
        </div>

        <Link
          href="/admin/internships/new"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Post Internship
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Title</th>
              <th className="p-4">Company</th>
              <th className="p-4">Location</th>
              <th className="p-4">Published</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {internships.map((internship: any) => (
              <tr 
                key={internship.id}
                className="border-b hover:bg-gray-50"
              >
                {/* Title */}
                <td className="p-4 font-medium">
                  {internship.title}
                </td>

                {/* Company */}
                <td className="p-4">
                  {internship.company}
                </td>

                {/* Location */}
                <td className="p-4 text-gray-600">
                  {internship.location}
                </td>

                {/* Published */}
                <td className="p-4">
                  {internship.published ? (
                    <span className="text-green-600 font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Draft
                    </span>
                  )}
                </td>

                {/* Created */}
                <td className="p-4 text-sm text-gray-500">
                  {new Date(internship.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link
                      href={`/admin/internships/edit/${internship.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={internship.id} />
                    <TrendingButton
                      id={internship.id}
                      isTrending={internship.isTrending}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}