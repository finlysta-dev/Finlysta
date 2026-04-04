"use client"

import {createProject } from "@/app/profile/actions/project.actions"

export default function ProjectForm() {
  return (
    <form
      action={createProject}
      className="border rounded-lg p-4 space-y-3"
    >
      <input
        name="title"
        placeholder="Project title"
        required
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <textarea
        name="description"
        placeholder="Project description"
        required
        rows={3}
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="techStack"
        placeholder="Tech stack (e.g. React, Node, SQL)"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="githubUrl"
        placeholder="GitHub repository URL"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <input
        name="liveUrl"
        placeholder="Live project URL (optional)"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
      >
        Add Project
      </button>
    </form>
  )
}
