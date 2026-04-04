"use client"

import {createEmployment } from "@/app/profile/actions/employment.actions"

export default function EmploymentForm() {
  return (
    <form
      action={createEmployment}
      className="bg-gray-50 p-4 rounded space-y-3"
    >
      <input
        name="company"
        placeholder="Company / Organization"
        className="w-full border p-2"
        required
      />

      <input
        name="role"
        placeholder="Role / Position"
        className="w-full border p-2"
        required
      />

      <input
        name="type"
        placeholder="Employment Type (Internship / Full-time)"
        className="w-full border p-2"
      />

      <div className="flex gap-2">
        <input
          name="startDate"
          placeholder="Start Date (e.g. Jan 2023)"
          className="w-full border p-2"
          required
        />
        <input
          name="endDate"
          placeholder="End Date (or leave empty)"
          className="w-full border p-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isCurrent" />
        Currently working here
      </label>

      <textarea
        name="description"
        placeholder="Work description / achievements"
        className="w-full border p-2"
      />

      <button className="px-4 py-2 bg-black text-white rounded">
        Add Employment
      </button>
    </form>
  )
}
