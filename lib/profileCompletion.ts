export function calculateProfileCompletion(user: any) {
  const checks = [
    { label: "Name", done: !!user.name },
    { label: "Headline", done: !!user.headline },
    { label: "Profile Summary", done: !!user.bio },
    { label: "Education", done: user.education?.length > 0 },
    { label: "Employment", done: user.employments?.length > 0 },
    { label: "Skills", done: user.skills?.length > 0 },
    { label: "Resume", done: !!user.resumeUrl },
    { label: "LinkedIn", done: !!user.linkedinUrl },
  ]

  const completed = checks.filter(c => c.done).length
  const percentage = Math.round((completed / checks.length) * 100)

  const missing = checks.filter(c => !c.done).map(c => c.label)

  return { percentage, missing }
}
