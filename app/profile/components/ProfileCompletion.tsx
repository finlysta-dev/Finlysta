export default function ProfileCompletion({ user }: { user: any }) {
  let score = 0

  if (user.image) score += 10
  if (user.headline) score += 10
  if (user.bio) score += 10
  if (user.education?.length) score += 15
  if (user.employments?.length) score += 15
  if (user.projects?.length) score += 10
  if (user.skills?.length) score += 10
  if (user.resumeUrl) score += 10
  if (user.linkedinUrl) score += 10

  return (
    <section className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">
          Profile Strength
        </h3>
        <span className="text-sm font-medium text-gray-600">
          {score}%
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </section>
  )
}
