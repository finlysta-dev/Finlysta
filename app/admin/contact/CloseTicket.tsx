"use client";

import { useRouter } from "next/navigation";

export default function CloseTicket({ id }: { id: string }) {

  const router = useRouter();

  const closeTicket = async () => {

    try {

      const res = await fetch(`/api/admin/contact/${id}/close`, {
        method: "POST"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      router.refresh();

    } catch (error) {

      alert("Failed to close ticket");

    }

  };

  return (
    <button
      onClick={closeTicket}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg"
    >
      Close Ticket
    </button>
  );

}