import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-blue-600">Home</Link>
      {items.map((item, index) => (
        <div key={item.url} className="flex items-center gap-2">
          <ChevronRight size={14} />
          {index === items.length - 1 ? (
            <span className="text-slate-800 font-medium">{item.name}</span>
          ) : (
            <Link href={item.url} className="hover:text-blue-600">{item.name}</Link>
          )}
        </div>
      ))}
    </nav>
  )
}
