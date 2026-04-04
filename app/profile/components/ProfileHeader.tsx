import Link from "next/link"
import {
  MapPin,
  Mail,
  Linkedin,
  Github,
  Globe
} from "lucide-react"

export default function ProfileHeader({ user }: { user: any }) {
  return (
    <section className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex justify-between items-start">

          <div className="flex gap-6">

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
              {user.image && (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h1>

              <p className="text-gray-600 mt-1">
                {user.headline || "Add a headline"}
              </p>

              <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-500">

                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {user.location}
                  </div>
                )}

                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </div>
                )}
              </div>

              <div className="flex gap-6 mt-4 text-sm">

                {user.linkedinUrl && (
                  <Link
                    href={user.linkedinUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </Link>
                )}

                {user.githubUrl && (
                  <Link
                    href={user.githubUrl}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Github size={16} />
                    GitHub
                  </Link>
                )}

                {user.portfolioUrl && (
                  <Link
                    href={user.portfolioUrl}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Globe size={16} />
                    Portfolio
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Link
            href="/profile/edit"
            className="text-sm border px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  )
}
