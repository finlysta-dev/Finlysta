"use client"

import { useState } from "react"
import EmploymentForm from "./EmploymentForm"
import { deleteEmployment } from "@/app/profile/actions/employment.actions"

export default function EmploymentSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)

  const employments = user?.employments ?? []

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900">
          Employment
        </h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      {/* LIST OR EMPTY STATE */}
      {employments.length === 0 ? (
        <p className="text-sm text-gray-400">
          Add your work experience
        </p>
      ) : (
        <div className="space-y-3">
          {employments.map((job: any) => (
            <div
              key={job.id}
              className="relative border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <form action={deleteEmployment.bind(null, job.id)}>
                <button
                  type="submit"
                  className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </form>

              <p className="font-medium text-gray-900">
                {job.role}
              </p>

              <p className="text-sm text-gray-600">
                {job.company}
                {job.type && ` • ${job.type}`}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {job.startDate} –{" "}
                {job.isCurrent ? "Present" : job.endDate}
              </p>

              {job.description && (
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">
                  {job.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD FORM — ONLY WHEN CLICKED */}
      {showForm && <EmploymentForm />}
    </section>
  )
}
