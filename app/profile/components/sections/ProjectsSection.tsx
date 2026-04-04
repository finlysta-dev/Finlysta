"use client"

import { useState } from "react"
import ProjectForm from "./ProjectForm"
import { deleteProject } from "@/app/profile/actions/project.actions"

export default function ProjectsSection({ user }: { user: any }) {
  const [showForm, setShowForm] = useState(false)

  const projects = user?.projects ?? []

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900">
          Projects
        </h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {projects.length === 0 ? (
        <p className="text-sm text-gray-400">
          Add projects to showcase your work
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project: any) => (
            <div
              key={project.id}
              className="relative border rounded-lg p-4"
            >
              <form action={deleteProject.bind(null, project.id)}>
                <button
                  type="submit"
                  className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </form>

              <p className="font-medium text-gray-900">
                {project.title}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {project.description}
              </p>

              {project.techStack?.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Tech: {project.techStack.join(", ")}
                </p>
              )}

              <div className="flex gap-4 text-sm mt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD FORM */}
      {showForm && <ProjectForm />}
    </section>
  )
}
