"use client"

import { useState } from "react"
import EducationForm from "./EducationForm"
import { deleteEducation } from "@/app/profile/actions/education.actions"

export default function EducationSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)
  const education = user?.education ?? []

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900">
          Education
        </h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      {education.length === 0 ? (
        <p className="text-sm text-gray-400">
          Add your education details
        </p>
      ) : (
        <div className="space-y-3">
          {education.map((edu: any) => (
            <div
              key={edu.id}
              className="relative border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <form action={deleteEducation.bind(null, edu.id)}>
                <button
                  type="submit"
                  className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </form>

              <p className="font-medium text-gray-900">
                {edu.school}
              </p>

              <p className="text-sm text-gray-600">
                {edu.degree}
                {edu.field && ` • ${edu.field}`}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {edu.yearStart} – {edu.yearEnd}
              </p>
            </div>
          ))}
        </div>
      )}

      {showForm && <EducationForm />}
    </section>
  )
}
