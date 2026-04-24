"use client";

import { Internship } from "@prisma/client";

interface InternshipsClientProps {
  internships: Internship[];
  appliedIds: string[];
}

export default function InternshipsClient({
  internships,
  appliedIds,
}: InternshipsClientProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Applications
      </h2>

      <p className="text-gray-600 mt-2">
        Total internships: {internships.length}
      </p>

      <p className="text-gray-600 mt-1">
        Applied internships: {appliedIds.length}
      </p>
    </div>
  );
}
