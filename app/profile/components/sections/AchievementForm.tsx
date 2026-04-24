import { createAchievement } from "@/app/profile/actions/achievement.actions"

export default function AchievementForm() {
  return (
    <form action={createAchievement} className="border rounded-lg p-4 space-y-3">

      <input
        name="type"
        placeholder="Type (e.g. Award, Hackathon, Publication)"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="title"
        placeholder="Title"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="link"
        placeholder="Link (optional)"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded text-sm"
      >
        Add Achievement
      </button>

    </form>
  )
}
