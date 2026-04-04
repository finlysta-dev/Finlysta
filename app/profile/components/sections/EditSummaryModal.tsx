"use client"

import { useState } from "react"
import EditModal from "../EditModal"
import { updateBasicInfo } from "@/app/profile/actions/updateBasicInfo"

export default function EditSummaryModal({ user }: { user: any }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-blue-600"
      >
        Edit
      </button>

      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile Summary"
      >
        <form
          action={updateBasicInfo}
          className="space-y-3"
          onSubmit={() => setOpen(false)}
        >
          <input
            name="headline"
            defaultValue={user.headline}
            placeholder="Headline"
            className="w-full border p-2"
          />

          <textarea
            name="bio"
            defaultValue={user.bio}
            placeholder="Profile summary"
            className="w-full border p-2"
            rows={4}
          />

          <button className="px-4 py-2 bg-black text-white rounded">
            Save
          </button>
        </form>
      </EditModal>
    </>
  )
}
