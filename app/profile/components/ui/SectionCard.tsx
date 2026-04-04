import { ReactNode } from "react"

export default function SectionCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section className="bg-white border rounded-lg p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="text-gray-700">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div>{children}</div>
    </section>
  )
}
