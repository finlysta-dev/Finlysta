"use client"

import { useState } from "react"
import AchievementForm from "./AchievementForm"
import { deleteAchievement } from "@/app/profile/actions/achievement.actions"

export default function AchievementsSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)
  const achievements = user?.accomplishments ?? []

  return (
    <section className="bg-white rounded-lg shadow-sm border p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">
          Achievements
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      {achievements.length === 0 ? (
        <p className="text-sm text-gray-400">
          Highlight awards, recognitions, or major accomplishments
        </p>
      ) : (
        achievements.map((item: any) => (
          <div key={item.id} className="border rounded-lg p-4 relative">
            <form action={deleteAchievement.bind(null, item.id)}>
              <button
                type="submit"
                className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </form>

            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">
              {item.type}
            </p>

            {item.description && (
              <p className="text-sm text-gray-700 mt-2">
                {item.description}
              </p>
            )}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                className="text-sm text-blue-600 hover:underline mt-2 block"
              >
                View Reference
              </a>
            )}
          </div>
        ))
      )}

      {showForm && <AchievementForm />}
    </section>
  )
}
