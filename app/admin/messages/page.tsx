import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getMessages() {

  const messages = await prisma.contactMessage.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });

  return messages;

}

export default async function AdminMessages() {

  const messages = await getMessages();

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Contact Messages
      </h1>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">User</th>
            <th className="p-3 border">Subject</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>

          </tr>

        </thead>

        <tbody>

          {messages.map((m:any)=> (

            <tr key={m.id} className="border">

              <td className="p-3 border">{m.name}</td>

              <td className="p-3 border">{m.email}</td>

              <td className="p-3 border">{m.userType}</td>

              <td className="p-3 border">{m.subject}</td>

              <td className="p-3 border">

                {m.status === "closed" ? (
                  <span className="text-green-600 font-semibold">
                    Closed
                  </span>
                ) : (
                  <span className="text-yellow-600 font-semibold">
                    Open
                  </span>
                )}

              </td>

              <td className="p-3 border">

                {m.status !== "closed" && (

                  <form action={`/api/contact/update`} method="POST">

                    <input type="hidden" name="id" value={m.id}/>
                    <input type="hidden" name="status" value="closed"/>

                    <button className="bg-black text-white px-3 py-1 rounded">

                      Mark Closed

                    </button>

                  </form>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}