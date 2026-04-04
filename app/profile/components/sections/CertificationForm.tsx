"use client"

import { createCertification } from "@/app/profile/actions/certification.actions"

export default function CertificationForm() {
  return (
    <form
      action={createCertification}
      className="border rounded-lg p-4 space-y-3"
    >
      <input
        name="title"
        placeholder="Certification title"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="issuer"
        placeholder="Issuer"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="link"
        placeholder="Certificate link (optional)"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="validFrom"
        placeholder="Valid From"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="validTo"
        placeholder="Valid To"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded text-sm"
      >
        Add Certification
      </button>
    </form>
  )
}