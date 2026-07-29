'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) {
          throw new Error('Not authenticated')
        }
        return res.json()
      })
      .then(data => {
        setUser(data.user)
        setIsLoading(false)
      })
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                You are signed in as <strong>{user.email}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Role: <span className="capitalize">{user.role.toLowerCase()}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900">Applications</h3>
              <p className="text-2xl font-bold text-blue-700">0</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-900">Saved Jobs</h3>
              <p className="text-2xl font-bold text-green-700">0</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900">Profile Views</h3>
              <p className="text-2xl font-bold text-purple-700">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}