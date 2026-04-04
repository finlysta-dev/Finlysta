"use client"

import { createEducation } from "@/app/profile/actions/education.actions"

export default function EducationForm() {
  return (
    <form
      action={createEducation}
      className="bg-gray-50 p-4 rounded space-y-2"
    >
      <input
        name="school"
        placeholder="School / College"
        className="w-full border p-2"
        required
      />

      <input
        name="degree"
        placeholder="Degree"
        className="w-full border p-2"
        required
      />

      <input
        name="field"
        placeholder="Field of Study"
        className="w-full border p-2"
      />

      <div className="flex gap-2">
        <input
          name="yearStart"
          placeholder="Start Year"
          className="w-full border p-2"
        />
        <input
          name="yearEnd"
          placeholder="End Year"
          className="w-full border p-2"
          required
        />
      </div>

      <button className="px-4 py-2 bg-black text-white rounded">
        Add Education
      </button>
    </form>
  )
}
