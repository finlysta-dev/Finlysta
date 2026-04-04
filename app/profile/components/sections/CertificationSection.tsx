"use client"

import { useState } from "react"
import CertificationForm from "./CertificationForm"
import { deleteCertification } from "@/app/profile/actions/certification.actions"

export default function CertificationsSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)
  const certifications = user?.certificates ?? []

  return (
    <section className="bg-white rounded-lg shadow-sm border p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">
          Certifications
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      {certifications.length === 0 ? (
        <p className="text-sm text-gray-400">
          Add certifications to strengthen your profile
        </p>
      ) : (
        certifications.map((cert: any) => (
          <div key={cert.id} className="border rounded-lg p-4 relative">
            <form action={deleteCertification.bind(null, cert.id)}>
              <button
                type="submit"
                className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </form>

            <p className="font-medium">{cert.title}</p>
            <p className="text-sm text-gray-600">
              {cert.issuer}
            </p>

            {(cert.validFrom || cert.validTo) && (
              <p className="text-xs text-gray-400 mt-1">
                {cert.validFrom} – {cert.validTo || "Present"}
              </p>
            )}

            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                className="text-sm text-blue-600 hover:underline mt-2 block"
              >
                View Credential
              </a>
            )}
          </div>
        ))
      )}

      {showForm && <CertificationForm />}
    </section>
  )
}
