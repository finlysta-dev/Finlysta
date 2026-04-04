import EditSummaryModal from "./EditSummaryModal"

export default function AboutSection({
  user,
  isPublic = false,
}: {
  user: any
  isPublic?: boolean
}) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-900">
          Profile Summary
        </h2>
        {!isPublic && <EditSummaryModal user={user} />}
      </div>

      {user.bio ? (
        <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
          {user.bio}
        </p>
      ) : (
        <p className="text-sm text-gray-400">
          Add a short summary to highlight your experience
        </p>
      )}
    </section>
  )
}
