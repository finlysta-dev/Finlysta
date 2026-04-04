"use client"

import { uploadResume } from "@/app/profile/actions/resume.actions"

export default function ResumeUploadForm() {
  return (
    <form
      action={uploadResume}
      method="post"
      encType="multipart/form-data"
      className="flex items-center gap-3 flex-wrap"
    >
      {/* FILE INPUT */}
      <input
        type="file"
        name="resume"
        accept="application/pdf"
        required
        className="text-sm border rounded px-3 py-2 w-full sm:w-auto"
      />

      {/* SAVE BUTTON */}
      <button
        type="submit"
        className="px-5 py-2 text-sm rounded bg-black text-white hover:bg-gray-800 whitespace-nowrap"
      >
        Save
      </button>
    </form>
  )
}
