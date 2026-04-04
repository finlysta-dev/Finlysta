"use client"

import { ReactNode } from "react"

export default function EditModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
