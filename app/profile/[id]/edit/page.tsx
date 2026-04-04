import { updateContactInfo } from "@/app/profile/actions/profile.actions"

export default async function EditProfilePage() {

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      <section className="bg-white border rounded-xl p-6 space-y-6">
        <h2 className="font-semibold text-gray-900">
          Contact & Social Links
        </h2>

        <form action={updateContactInfo} className="space-y-4">

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <input
              name="location"
              placeholder="City, Country"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-sm text-gray-600">LinkedIn URL</label>
            <input
              name="linkedinUrl"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="text-sm text-gray-600">GitHub URL</label>
            <input
              name="githubUrl"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="text-sm text-gray-600">Portfolio Website</label>
            <input
              name="portfolioUrl"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* Medium */}
          <div>
            <label className="text-sm text-gray-600">Medium Profile</label>
            <input
              name="mediumUrl"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="text-sm text-gray-600">Twitter / X</label>
            <input
              name="twitterUrl"
              className="w-full border rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
          >
            Save Changes
          </button>

        </form>
      </section>
    </main>
  )
}