"use client"

import {addSkill} from "@/app/profile/actions/skills.actions"

export default function SkillsForm() {
  return (
    <form action={addSkill} className="flex gap-2 mt-3">
      <input
        name="skill"
        placeholder="Add a skill (e.g. React)"
        className="flex-1 border p-2 text-sm"
        required
      />

      <button
        type="submit"
        className="px-3 py-2 bg-black text-white text-sm rounded"
      >
        Add
      </button>
    </form>
  )
}
