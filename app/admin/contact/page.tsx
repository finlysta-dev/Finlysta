import prisma from "@/lib/prisma"
import Link from "next/link"
import ReplyForm from "./Replyform"
import CloseTicket from "./CloseTicket"

export const dynamic = "force-dynamic"

export default async function ContactAdminPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const filter = searchParams?.status || "ALL"

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  })

  const newCount = messages.filter((m: any) => m.status === "NEW").length
  const repliedCount = messages.filter((m: any) => m.status === "REPLIED").length
  const closedCount = messages.filter((m: any) => m.status === "CLOSED").length

  // ✅ FIXED: Single declaration with else-if chain
  let filteredMessages: any[] = [];

  if (filter === "ALL") {
    filteredMessages = messages;
  } else if (filter === "NEW") {
    filteredMessages = messages.filter((m: any) => m.status === "NEW");
  } else if (filter === "REPLIED") {
    filteredMessages = messages.filter((m: any) => m.status === "REPLIED");
  } else if (filter === "CLOSED") {
    filteredMessages = messages.filter((m: any) => m.status === "CLOSED");
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        Contact Tickets
      </h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/admin/contact"
          className="px-4 py-2 border rounded-lg"
        >
          All
        </Link>

        <Link
          href="/admin/contact?status=NEW"
          className="px-4 py-2 border rounded-lg bg-yellow-50"
        >
          New ({newCount})
        </Link>

        <Link
          href="/admin/contact?status=REPLIED"
          className="px-4 py-2 border rounded-lg bg-green-50"
        >
          Replied ({repliedCount})
        </Link>

        <Link
          href="/admin/contact?status=CLOSED"
          className="px-4 py-2 border rounded-lg bg-gray-200"
        >
          Closed ({closedCount})
        </Link>
      </div>

      {/* TICKETS */}
      <div className="space-y-6">
        {filteredMessages.length === 0 && (
          <p className="text-gray-500">
            No messages found.
          </p>
        )}

        {filteredMessages.map((msg: any) => (
          <div
            key={msg.id}
            className="border rounded-xl p-6 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div>
                <h2 className="font-semibold text-lg">
                  {msg.subject}
                </h2>
                <p className="text-sm text-gray-500">
                  {msg.name} • {msg.email}
                </p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-full
                ${
                  msg.status === "NEW"
                    ? "bg-yellow-100 text-yellow-700"
                    : msg.status === "REPLIED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {msg.status}
              </span>
            </div>

            <p className="text-gray-700 mb-4">
              {msg.message}
            </p>

            {msg.reply && (
              <div className="bg-gray-50 border rounded-lg p-3 mb-4">
                <b>Admin Reply:</b>
                <p>{msg.reply}</p>
              </div>
            )}

            {/* REPLY */}
            {!msg.reply && msg.status !== "CLOSED" && (
              <ReplyForm id={msg.id} />
            )}

            {/* CLOSE */}
            {msg.status !== "CLOSED" && (
              <div className="mt-3">
                <CloseTicket id={msg.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}