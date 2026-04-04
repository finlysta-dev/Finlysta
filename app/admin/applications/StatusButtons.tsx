"use client";

import { useRouter } from "next/navigation";

export default function StatusButtons({ id }: { id: string }) {

  const router = useRouter();

  const updateStatus = async (status: string) => {

    await fetch(`/api/admin/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    router.refresh();
  };

  return (
    <div className="flex gap-2">

      <button
        onClick={() => updateStatus("ACCEPTED")}
        className="text-green-600 text-sm"
      >
        Accept
      </button>

      <button
        onClick={() => updateStatus("REJECTED")}
        className="text-red-600 text-sm"
      >
        Reject
      </button>

      <button
        onClick={() => updateStatus("REVIEWED")}
        className="text-blue-600 text-sm"
      >
        Review
      </button>

    </div>
  );
}