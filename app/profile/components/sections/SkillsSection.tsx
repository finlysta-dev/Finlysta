"use client"

import { useState } from "react"
import SkillsForm from "./SkillsForm"
import { deleteSkill } from "@/app/profile/actions/skills.actions"

export default function SkillsSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)

  const skills: string[] = user?.skills ?? []

  return (
    <section className="bg-white p-4 rounded space-y-3">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Key Skills</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm text-blue-600"
        >
          + Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {skills.length === 0 && (
        <p className="text-sm text-gray-500">
          Add skills to get better job matches
        </p>
      )}

      {/* SKILLS LIST */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <form
            key={skill}
            action={deleteSkill.bind(null, skill)}
          >
            <button
              type="submit"
              className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-red-100"
            >
              {skill} ✕
            </button>
          </form>
        ))}
      </div>

      {/* ADD FORM (HIDDEN BY DEFAULT) */}
      {showForm && <SkillsForm />}
    </section>
  )
}
