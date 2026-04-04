import { FileText, Download } from "lucide-react"
import Link from "next/link"
import SectionCard from "../ui/SectionCard"

export default function ResumeCard({ user }: any) {
  return (
    <SectionCard
      title="Resume"
      icon={<FileText size={18} />}
    >
      {user.resumeUrl ? (
        <div className="flex justify-between items-center bg-gray-50 rounded-md p-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              {user.resumeName}
            </p>
            {user.resumeUpdated && (
              <p className="text-xs text-gray-400">
                Updated {new Date(user.resumeUpdated).toLocaleDateString()}
              </p>
            )}
          </div>

          <Link
            href={user.resumeUrl}
            target="_blank"
            className="flex items-center gap-2 text-blue-600 text-sm"
          >
            <Download size={16} />
            Download
          </Link>
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No resume uploaded
        </p>
      )}
    </SectionCard>
  )
}
