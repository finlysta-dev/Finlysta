"use client";

import { useRouter } from "next/navigation";

export default function TicketActions({ ticket }: any) {

  const router = useRouter();

  const updateStatus = async (status: string) => {

    await fetch("/api/contact/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: ticket.id,
        status
      })
    });

    router.refresh();
  };

  return (

    <div className="flex gap-2">

      <a
        href={`mailto:${ticket.email}?subject=Re: ${ticket.subject}`}
        onClick={() => updateStatus("replied")}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        Reply
      </a>

      {ticket.status !== "closed" && (

        <button
          onClick={() => updateStatus("closed")}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          Close
        </button>

      )}

    </div>

  );
}
