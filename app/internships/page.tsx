'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Menu, X, Search, MapPin, ChevronDown, Clock, Bookmark, Bell, 
  Send, BarChart3, Briefcase, BadgeCheck, Building2, AlarmClock, 
  Sparkles, RotateCcw, LayoutGrid, List, Filter, CalendarDays,
  Building, Users, TrendingUp, Plus, ChevronUp, RotateCw, CheckCircle,
  GraduationCap, BriefcaseBusiness, Timer, Trash2, Award
} from 'lucide-react'

interface Job {
  id: string
  slug: string
  title: string
  company: string
  companyLogo?: string
  type: string
  workMode: string
  location: string
  city?: string
  state?: string
  country?: string
  experience?: string
  duration?: string
  salary?: string
  skills: string[]
  overview?: string
  shortDescription?: string
  isNew: boolean
  isVerified: boolean
  isTrending: boolean
  isActivelyHiring: boolean
  postedAt: string
  postedTime?: string
  views: number
  applyClicks: number
  logoBg?: string
  timeAgo?: string
  description?: string
  applyLink?: string
  qualifications?: string
}

export default function FinlystaUI() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewType, setViewType] = useState<'list' | 'grid'>('list')
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    location: true,
    experience: true,
    skills: true,
  })
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [skillsSearch, setSkillsSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('newest')
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [error, setError] = useState<string | null>(null)
  const [savedJobs, setSavedJobs] = useState<any[]>([])
  const [showSavedJobs, setShowSavedJobs] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/internships", label: "Internships" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/career-paths", label: "Career Paths" },
    { href: "/interview-prep", label: "Interview Prep" },
  ]

  const resourcesItems = [
    { href: "/blogs", label: "Blogs" },
    { href: "/guides", label: "Guides" },
    { href: "/templates", label: "Templates" },
    { href: "/webinars", label: "Webinars" },
    { href: "/case-studies", label: "Case Studies" },
  ]

  const noPrefetch = ["/blogs", "/learning-hub", "/interview-prep", "/career-paths"]

  const popularSearches = ['Finance Analyst Intern', 'Finance Intern', 'Accounts Intern', 'Audit Intern', 'Article Trainee']

  const skillAliasMap: Record<string, string> = {
    'excel': 'Advanced Excel',
    'ms excel': 'Advanced Excel',
    'microsoft excel': 'Advanced Excel',
    'advanced excel': 'Advanced Excel',
    'adv excel': 'Advanced Excel',
  }

  const normalizeSkill = (skill: string): string => {
    if (!skill) return skill
    const key = skill.trim().toLowerCase()
    return skillAliasMap[key] || skill
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_blogs') || '[]')
    setSavedJobs(saved)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.resources-dropdown')) {
        setResourcesDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [])

  const formatPostedTime = (date: string): string => {
    if (!date) return 'Recently'
    
    const now = new Date()
    const postedDate = new Date(date)
    
    if (isNaN(postedDate.getTime())) return 'Recently'
    
    const diffMs = now.getTime() - postedDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
    return `${Math.floor(diffDays / 365)}y ago`
  }

  const isJobNew = (postedAt: string): boolean => {
    if (!postedAt) return false
    const now = new Date()
    const postedDate = new Date(postedAt)
    const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / 86400000)
    return diffDays < 1
  }

  const fetchJobs = async () => {
    try {
      setError(null)
      
      const response = await fetch('/api/opportunities')
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      
      const data = await response.json()
      
      const jobData = Array.isArray(data) 
        ? data.filter((item: any) => {
            return item.type === 'internship' || item.type === 'articleship' || item.type === 'industrial_trainee'
          })
        : []
      
      const formattedJobs = jobData.map((job: any) => {
        const formattedLocation = job.city && job.country 
          ? `${job.city}, ${job.country}`
          : job.location || 'India'
        
        let jobTypeDisplay = job.type || 'Internship'
        if (job.type === 'internship') jobTypeDisplay = 'Internship'
        if (job.type === 'articleship') jobTypeDisplay = 'Articleship'
        if (job.type === 'industrial_trainee') jobTypeDisplay = 'Industrial Trainee'
        
        let experienceDisplay = job.experience || '0 - 1 Yrs'
        
        const timeAgo = formatPostedTime(job.postedAt || new Date().toISOString())
        const isNew = isJobNew(job.postedAt || new Date().toISOString())
        
        return {
          id: job.id,
          slug: job.slug,
          title: job.title,
          company: job.company || 'Company',
          companyLogo: job.companyLogo,
          type: jobTypeDisplay,
          workMode: job.workMode || 'On-site',
          location: formattedLocation,
          city: job.city || job.location?.split(',')[0]?.trim() || 'India',
          state: job.state,
          country: job.country || 'India',
          experience: experienceDisplay,
          duration: job.duration,
          salary: job.salary,
          skills: job.skills || [],
          overview: job.overview || '',
          shortDescription: job.shortDescription || job.overview?.substring(0, 200) || 'No description available',
          isNew: isNew,
          isVerified: job.isVerified || false,
          isTrending: job.isTrending || false,
          isActivelyHiring: job.isActivelyHiring || true,
          postedAt: job.postedAt || new Date().toISOString(),
          postedTime: job.postedTime || timeAgo,
          views: job.views || 0,
          applyClicks: job.applyClicks || 0,
          logoBg: getCompanyColor(job.company || ''),
          timeAgo: timeAgo,
          description: job.shortDescription || job.overview?.substring(0, 200) || 'No description available',
          applyLink: job.applyLink || '#',
          qualifications: job.qualifications || job.overview || 'No qualifications specified',
        }
      })
      
      setAllJobs(formattedJobs)
      setJobs(formattedJobs)
      
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to load jobs. Please try again later.')
    }
  }

  const toggleSaveJob = (jobId: string) => {
    const jobToSave = allJobs.find(job => job.id === jobId)
    if (!jobToSave) return
    
    let updatedSavedJobs: any[]
    let message: string
    const isSaved = savedJobs.some(job => job.id === jobId)
    
    if (isSaved) {
      updatedSavedJobs = savedJobs.filter(job => job.id !== jobId)
      message = 'Removed from saved!'
    } else {
      const newJob = {
        id: jobToSave.id,
        slug: jobToSave.slug,
        title: jobToSave.title,
        company: jobToSave.company,
        companyLogo: jobToSave.companyLogo,
        location: jobToSave.location,
        type: jobToSave.type,
        experience: jobToSave.experience,
        applyLink: jobToSave.applyLink || '#',
      }
      updatedSavedJobs = [...savedJobs, newJob]
      message = 'Saved successfully!'
    }
    setSavedJobs(updatedSavedJobs)
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedJobs))
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const removeSavedJob = (jobId: string) => {
    const updatedSavedJobs = savedJobs.filter((job: any) => job.id !== jobId)
    setSavedJobs(updatedSavedJobs)
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedJobs))
  }

  const clearAllSavedJobs = () => {
    setSavedJobs([])
    localStorage.setItem('saved_blogs', JSON.stringify([]))
  }

  const handleViewDetails = (slug: string) => {
    router.push(`/jobs/${slug}`)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setEmailStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xvzjrzao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setEmailStatus('success')
        setEmail('')
        setTimeout(() => setEmailStatus('idle'), 3000)
      } else {
        setEmailStatus('error')
        setTimeout(() => setEmailStatus('idle'), 3000)
      }
    } catch (error) {
      setEmailStatus('error')
      setTimeout(() => setEmailStatus('idle'), 3000)
    }
  }

  const getCompanyColor = (company: string) => {
    const colors = [
      'bg-black', 'bg-blue-900', 'bg-blue-600', 
      'bg-orange-500', 'bg-red-600', 'bg-green-600',
      'bg-purple-600', 'bg-teal-600', 'bg-pink-600',
      'bg-indigo-600', 'bg-rose-600', 'bg-amber-600'
    ]
    const index = company.length % colors.length
    return colors[index]
  }

  const getJobTypeCount = (type: string) => {
    return allJobs.filter(job => {
      if (type === 'full-time') return job.type === 'Full-time'
      if (type === 'internship') return job.type === 'Internship'
      if (type === 'articleship') return job.type === 'Articleship'
      if (type === 'industrial_trainee') return job.type === 'Industrial Trainee'
      if (type === 'apprentice') return job.type?.toLowerCase().includes('trainee') || job.type?.toLowerCase().includes('apprentice')
      if (type === 'contract') return job.type?.toLowerCase().includes('contract')
      return false
    }).length
  }

  const getLocationCount = (location: string) => {
    return allJobs.filter(job => {
      if (location === 'all-india') return true
      if (location === 'remote') return job.workMode?.toLowerCase().includes('remote')
      return job.city?.toLowerCase().includes(location) || job.location?.toLowerCase().includes(location)
    }).length
  }

  const getExperienceCount = (exp: string) => {
    return allJobs.filter(job => {
      if (exp === '0-1') return job.experience === '0 - 1 Yrs'
      if (exp === '1-2') return job.experience === '1 - 2 Yrs'
      return false
    }).length
  }

  const getSkillsCount = (skill: string) => {
    return allJobs.filter(job => job.skills?.some(s => normalizeSkill(s).toLowerCase() === skill.toLowerCase())).length
  }

  const getUniqueCities = () => {
    const cities = allJobs.map(job => job.city).filter(Boolean)
    const uniqueCities = [...new Set(cities)]
    return uniqueCities.map(city => ({
      label: city || 'Other',
      count: allJobs.filter(job => job.city === city).length,
      value: city?.toLowerCase().replace(/\s+/g, '-') || 'other'
    }))
  }

  const jobTypeOptions = [
    { label: 'Internships', count: getJobTypeCount('internship'), value: 'internship' },
    { label: 'Articleship', count: getJobTypeCount('articleship'), value: 'articleship' },
    { label: 'Industrial Trainee', count: getJobTypeCount('industrial_trainee'), value: 'industrial_trainee' },
    { label: 'Contract', count: getJobTypeCount('contract'), value: 'contract' },
  ]

  const locationOptions = [
    { label: 'All India', count: allJobs.length, value: 'all-india' },
    { label: 'Remote (India)', count: getLocationCount('remote'), value: 'remote' },
    ...getUniqueCities().map(city => ({
      label: city.label,
      count: city.count,
      value: city.value
    }))
  ]

  const experienceOptions = [
    { label: '0 - 1 Yrs', count: getExperienceCount('0-1'), value: '0-1' },
  ]

  const skillsOptions = [
    { label: 'Advanced Excel', count: getSkillsCount('advanced excel'), value: 'advanced-excel' },
    { label: 'Accounting', count: getSkillsCount('accounting'), value: 'accounting' },
    { label: 'Financial Analysis', count: getSkillsCount('financial analysis'), value: 'financial-analysis' },
    { label: 'SQL', count: getSkillsCount('sql'), value: 'sql' },
    { label: 'Tally', count: getSkillsCount('tally'), value: 'tally' },
    { label: 'MIS', count: getSkillsCount('mis'), value: 'mis' },
    { label: 'Communication', count: getSkillsCount('communication'), value: 'communication' },
    { label: 'Data Analysis', count: getSkillsCount('data-analysis'), value: 'data-analysis' },
  ]

  const toggleSection = (section: 'jobType' | 'location' | 'experience' | 'skills') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleFilter = (filterType: string, value: string) => {
    const filterKey = `${filterType}-${value}`
    if (activeFilters.includes(filterKey)) {
      setActiveFilters(activeFilters.filter(f => f !== filterKey))
    } else {
      setActiveFilters([...activeFilters, filterKey])
    }
    applyFilters()
  }

  const applyFilters = () => {
    let filtered = [...allJobs]
    
    activeFilters.forEach(filter => {
      const [type, value] = filter.split('-')
      
      if (type === 'jobType') {
        if (value === 'full-time') filtered = filtered.filter(job => job.type === 'Full-time')
        if (value === 'internship') filtered = filtered.filter(job => job.type === 'Internship')
        if (value === 'articleship') filtered = filtered.filter(job => job.type === 'Articleship')
        if (value === 'industrial_trainee') filtered = filtered.filter(job => job.type === 'Industrial Trainee')
        if (value === 'apprentice') filtered = filtered.filter(job => job.type?.toLowerCase().includes('trainee') || job.type?.toLowerCase().includes('apprentice'))
        if (value === 'contract') filtered = filtered.filter(job => job.type?.toLowerCase().includes('contract'))
      }
      
      if (type === 'location') {
        if (value === 'all-india') return
        if (value === 'remote') filtered = filtered.filter(job => job.workMode?.toLowerCase().includes('remote'))
        filtered = filtered.filter(job => job.city?.toLowerCase().includes(value) || job.location?.toLowerCase().includes(value))
      }
      
      if (type === 'experience') {
        if (value === '0-1') filtered = filtered.filter(job => job.experience === '0 - 1 Yrs')
        if (value === '1-2') filtered = filtered.filter(job => job.experience === '1 - 2 Yrs')
      }
      
      if (type === 'skills') {
        const skillLabel = skillsOptions.find(opt => opt.value === value)?.label.toLowerCase()
        filtered = filtered.filter(job => job.skills?.some(s => s.toLowerCase() === skillLabel))
      }
    })
    
    setJobs(filtered)
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setJobs(allJobs)
  }

  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    const suggestions = new Set<string>()

    allJobs.forEach(job => {
      if (job.title?.toLowerCase().includes(query)) suggestions.add(job.title)
      if (job.company?.toLowerCase().includes(query)) suggestions.add(job.company)
      job.skills?.forEach(skill => {
        const normalized = normalizeSkill(skill)
        if (normalized.toLowerCase().includes(query) || skill.toLowerCase().includes(query)) {
          suggestions.add(normalized)
        }
      })
    })

    return Array.from(suggestions).slice(0, 8)
  }

  const getLocationSuggestions = () => {
    if (!locationQuery.trim()) return []
    const query = locationQuery.toLowerCase()
    const suggestions = new Set<string>()

    allJobs.forEach(job => {
      if (job.city?.toLowerCase().includes(query)) suggestions.add(job.city)
      if (job.location?.toLowerCase().includes(query)) suggestions.add(job.location)
    })

    return Array.from(suggestions).slice(0, 8)
  }

  const runSearchQuery = (value: string) => {
    const lower = value.toLowerCase()
    const filtered = allJobs.filter(job => 
      job.title.toLowerCase().includes(lower) ||
      job.company.toLowerCase().includes(lower) ||
      job.skills.some(s => normalizeSkill(s).toLowerCase().includes(lower) || s.toLowerCase().includes(lower))
    )
    setJobs(filtered)
  }

  const runLocationQuery = (value: string) => {
    const lower = value.toLowerCase()
    const filtered = allJobs.filter(job => 
      job.location.toLowerCase().includes(lower) ||
      job.city?.toLowerCase().includes(lower)
    )
    setJobs(filtered)
  }

  const filteredJobs = jobs

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
    }
    return 0
  })

  const jobsPerPage = 6
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleViewToggle = (view: 'list' | 'grid') => {
    setViewType(view)
  }

  const filteredLocations = locationOptions.filter(option => 
    option.label.toLowerCase().includes(locationSearch.toLowerCase())
  )

  const filteredSkills = skillsOptions.filter(option => 
    option.label.toLowerCase().includes(skillsSearch.toLowerCase())
  )

  const displayedLocations = showAllLocations ? filteredLocations : filteredLocations.slice(0, 5)
  const displayedSkills = showAllSkills ? filteredSkills : filteredSkills.slice(0, 5)

  // Helper to check if job is articleship
  const isArticleship = (job: Job) => {
    return job.type === 'Articleship' || job.type === 'Industrial Trainee'
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchJobs} 
            className="mt-4 px-6 py-2 bg-[#0052FF] text-white rounded-lg hover:bg-[#0041CC] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          overflow-x: hidden;
        }
        .container-custom {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .badge-blue {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #EBF0FF;
          color: #0052FF;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        .btn-primary {
          background: #0052FF;
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn-primary:hover {
          background: #0041CC;
        }
        .hero-image-container {
          background: transparent;
          border-radius: 24px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 450px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-image-container {
            min-height: 250px;
          }
        }
        .view-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .view-btn.active {
          background: #0052FF;
          border-color: #0052FF;
          color: white;
        }
        .view-btn:hover {
          border-color: #0052FF;
        }
        .skill-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #EBF0FF;
          color: #0052FF;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
        }
        .new-badge {
          background: #dcfce7;
          color: #16a34a;
          font-size: 11px;
          font-weight: bold;
          padding: 2px 10px;
          border-radius: 9999px;
        }
        .nav-link {
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          transition: color 0.2s;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #0052FF;
        }
        .nav-link-active {
          color: #0052FF;
        }
        .header-nav {
          display: flex;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .header-nav {
            gap: 20px;
          }
        }
        @media (max-width: 768px) {
          .header-nav {
            display: none;
          }
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
        .filter-sidebar {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 100%;
        }
        .show-more-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0052FF;
          font-size: 14px;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          margin-top: 4px;
        }
        .show-more-btn:hover {
          color: #0041CC;
        }
        .search-input-filter {
          width: 100%;
          height: 40px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          padding-left: 12px;
          padding-right: 12px;
          font-size: 15px;
          outline: none;
          background: white;
          color: #000000;
          margin-bottom: 10px;
        }
        .search-input-filter::placeholder {
          color: #999;
          font-size: 15px;
        }
        .search-input-filter:focus {
          border-color: #0052FF;
        }
        .filter-section {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }
        .filter-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .filter-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .filter-header h4 {
          font-weight: 600;
          color: #000000;
          font-size: 17px;
          margin: 0;
        }
        .filter-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          cursor: pointer;
          padding: 4px 0;
        }
        .filter-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin-right: 12px;
          cursor: pointer;
        }
        .filter-item span.label {
          flex: 1;
          color: #000000;
          font-size: 16px;
        }
        .filter-item span.count {
          color: #000000;
          font-size: 16px;
          font-weight: 500;
          background: #e5e7eb;
          padding: 0 8px;
          border-radius: 4px;
          min-width: 24px;
          text-align: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .filter-item span.count:hover {
          background: #0052FF;
          color: #ffffff;
        }
        .filter-sidebar-wrapper {
          width: 280px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-self: stretch;
          min-height: 100%;
        }
        .clear-all-bottom {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          width: 100%;
        }
        .clear-all-bottom button {
          width: 100%;
          padding: 12px;
          border: 1px solid #0052FF;
          border-radius: 6px;
          background: white;
          color: #0052FF;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .clear-all-bottom button:hover {
          background: #f5f8ff;
          border-color: #0041CC;
          color: #0041CC;
        }
        .filter-scroll-container {
          max-height: 400px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .filter-scroll-container::-webkit-scrollbar {
          width: 4px;
        }
        .filter-scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .filter-scroll-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        .filter-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .company-name {
          color: #0052FF;
          font-size: 17px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          margin-bottom: 8px;
        }
        .company-name:hover {
          color: #0041CC;
          text-decoration: underline;
        }
        .posted-time {
          color: #000000;
          font-size: 14px;
          font-weight: 500;
        }
        .job-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
        }
        .job-description {
          font-size: 15px;
          color: #000000;
          line-height: 1.6;
        }
        .job-location {
          font-size: 15px;
          color: #000000;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .job-detail {
          font-size: 15px;
          color: #000000;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .view-details-btn {
          color: #0052FF;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid #0052FF;
          padding: 6px 22px;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          margin-left: 16px;
          flex-shrink: 0;
        }
        .view-details-btn:hover {
          background: #f5f8ff;
          border-color: #0041CC;
          color: #0041CC;
        }
        .bookmark-icon {
          color: #000000;
          width: 24px;
          height: 24px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .bookmark-icon:hover {
          color: #0052FF;
        }
        .bookmark-icon.saved {
          fill: #0052FF;
          color: #0052FF;
        }
        .jobs-container {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .jobs-list {
          flex: 1;
        }
        .filter-wrapper {
          display: flex;
          gap: 32px;
          align-items: stretch;
        }
        .job-details-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 10px;
          margin-top: 4px;
        }
        .sort-select {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          background: white;
          color: #000000;
        }
        .pagination-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid #ddd;
          background: white;
          color: #4a4a4a;
          cursor: pointer;
          transition: all 0.3s;
        }
        .pagination-btn:hover {
          border-color: #0052FF;
          color: #0052FF;
        }
        .pagination-btn.active {
          border: none;
          background: #0052FF;
          color: white;
        }
        .pagination-btn:disabled {
          background: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
        .pagination-number {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid #ddd;
          background: white;
          color: #4a4a4a;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pagination-number:hover {
          border-color: #0052FF;
          color: #0052FF;
        }
        .pagination-number.active {
          border: none;
          background: #0052FF;
          color: white;
        }
        .search-input-label {
          display: block;
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }
        .search-input-box {
          width: 100%;
          height: 52px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          padding-left: 10px;
          padding-right: 32px;
          font-size: 17px;
          color: #000000;
          outline: none;
        }
        .search-input-box::placeholder {
          color: #000000;
          font-size: 17px;
        }
        .search-input-box:focus {
          border-color: #0052FF;
        }
        .no-spam-text {
          font-size: 16px;
          color: #000000;
          margin-top: 10px;
          padding-left: 76px;
        }
        .company-name-gap {
          margin-bottom: 8px;
        }
        .job-details-gap {
          margin-top: 6px;
        }
        .filter-sidebar h3 {
          font-size: 22px;
          font-weight: 700;
        }
        .filter-sidebar > div > button {
          font-size: 15px;
        }
        .save-message {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0052FF;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 500;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .grid-job-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          position: relative;
        }
        .grid-job-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: #0052FF;
          transform: translateY(-2px);
        }
        .grid-job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .grid-job-company {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          flex: 1;
          min-width: 0;
        }
        .grid-job-logo {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          flex-shrink: 0;
        }
        .grid-job-info {
          flex: 1;
          min-width: 0;
        }
        .grid-job-title {
          font-weight: 700;
          color: #000000;
          font-size: 18px;
          margin: 0 0 4px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .grid-job-company-name {
          color: #0052FF;
          font-size: 15px;
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }
        .grid-job-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        .grid-job-location-text {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #000000;
          font-size: 15px;
        }
        .grid-job-type-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 15px;
          color: #000000;
        }
        .grid-job-type-text span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .grid-job-description {
          color: #000000;
          font-size: 15px;
          margin-bottom: 12px;
          line-height: 1.6;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .grid-job-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
        }
        .grid-job-skills {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .grid-job-skill {
          font-size: 12px;
          padding: 3px 10px;
          background: #EBF0FF;
          color: #0052FF;
          border-radius: 4px;
          font-weight: 600;
          white-space: nowrap;
        }
        .grid-job-skill-count {
          font-size: 12px;
          color: #999;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          padding: 2px 0;
        }
        .grid-job-view-btn {
          color: #0052FF;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid #0052FF;
          padding: 6px 18px;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .grid-job-view-btn:hover {
          background: #f5f8ff;
          border-color: #0041CC;
          color: #0041CC;
        }
        .grid-job-time {
          color: #000000;
          font-size: 12px;
          white-space: nowrap;
        }
        .grid-job-bookmark {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #000000;
          transition: color 0.2s;
        }
        .grid-job-bookmark:hover {
          color: #0052FF;
        }
        .grid-job-bookmark.saved {
          fill: #0052FF;
          color: #0052FF;
        }
        .grid-job-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          flex-shrink: 0;
        }
        .grid-job-new-badge {
          font-size: 9px;
          padding: 1px 8px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 9999px;
          font-weight: bold;
          display: inline-block;
        }
        .grid-job-badges {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .filter-item .label {
          font-size: 16px !important;
          color: #000000 !important;
        }
        .filter-item .count {
          font-size: 16px !important;
        }
        .autosuggest-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          max-height: 260px;
          overflow-y: auto;
          z-index: 200;
        }
        .autosuggest-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          font-size: 15px;
          color: #111827;
          cursor: pointer;
          transition: background 0.15s;
        }
        .autosuggest-item:hover {
          background: #f5f8ff;
          color: #0052FF;
        }
        .saved-jobs-panel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          max-width: 420px;
          background: white;
          z-index: 999;
          box-shadow: -4px 0 30px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .saved-jobs-panel.open {
          transform: translateX(0);
        }
        .panel-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .panel-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .articleship-badge {
          background: #f3e8ff;
          color: #000000;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 9999px;
          display: inline-block;
        }
        .sort-select-box {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0 4px;
          background: white;
        }
      `}</style>

      {/* Save Message Toast */}
      {saveMessage && (
        <div className="save-message">
          <CheckCircle size={20} />
          {saveMessage}
        </div>
      )}

      {/* Saved Jobs Panel Backdrop */}
      <div 
        className={`panel-backdrop ${showSavedJobs ? 'open' : ''}`}
        onClick={() => setShowSavedJobs(false)}
      />

      {/* Saved Jobs Panel */}
      <div className={`saved-jobs-panel ${showSavedJobs ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h3 className="text-xl font-bold text-gray-900">Saved Opportunities</h3>
            <div className="flex items-center gap-3">
              {savedJobs.length > 0 && (
                <button
                  onClick={clearAllSavedJobs}
                  className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowSavedJobs(false)}
                className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {savedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Bookmark className="w-20 h-20 text-gray-300 mb-4" />
                <p className="text-xl font-medium text-gray-700">No saved opportunities yet</p>
                <p className="text-gray-500 mt-2">Start saving opportunities you're interested in!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedJobs.map((savedJob: any) => (
                  <div key={savedJob.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/jobs/${savedJob.slug}`}
                          onClick={() => setShowSavedJobs(false)}
                          className="font-semibold text-gray-900 hover:text-blue-600 text-base block truncate"
                        >
                          {savedJob.title}
                        </Link>
                        <p className="text-sm text-gray-600 truncate font-medium">{savedJob.company}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{savedJob.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Briefcase className="w-4 h-4 flex-shrink-0" />
                          <span>{savedJob.type}</span>
                          <span className="text-gray-300">|</span>
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{savedJob.experience}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSavedJob(savedJob.id)}
                        className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Link 
                        href={`/jobs/${savedJob.slug}`}
                        onClick={() => setShowSavedJobs(false)}
                        className="flex-1 text-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-lg transition"
                      >
                        View Details
                      </Link>
                      <a 
                        href={savedJob.applyLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm bg-green-50 text-green-600 hover:bg-green-100 font-medium px-4 py-2 rounded-lg transition"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {savedJobs.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <p className="text-sm text-gray-500 text-center">
                {savedJobs.length} opportunity{savedJobs.length > 1 ? 's' : ''} saved
              </p>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 font-sans antialiased ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="Finlysta - Finance Jobs and Internships for Freshers"
            >
              <Image
                src="/Finlysta.png"
                alt="Finlysta Logo"
                width={160}
                height={36}
                priority
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center justify-center gap-10 lg:gap-12 absolute left-1/2 transform -translate-x-1/2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    prefetch={!noPrefetch.includes(link.href)}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive ? "text-blue-600" : "text-black hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <div className="absolute top-full mt-1 left-0 right-0">
                      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              )
            })}

            <div className="relative resources-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setResourcesDropdownOpen(!resourcesDropdownOpen)
                }}
                className={`flex items-center gap-1 text-base transition-colors duration-200 font-medium ${
                  resourcesDropdownOpen || pathname?.startsWith("/resources")
                    ? "text-black"
                    : "text-black hover:text-blue-600"
                }`}
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${resourcesDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {resourcesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setResourcesDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowSavedJobs(!showSavedJobs)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors relative"
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-sm font-medium">Saved</span>
              {savedJobs.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedJobs.length}
                </span>
              )}
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 rounded-lg transition text-base ${isActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                    {link.label}
                  </Link>
                )
              })}
              <div className="border-t border-gray-100 pt-3 mt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Resources</p>
                {resourcesItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-lg transition text-sm ${pathname === item.href ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <button 
                onClick={() => setShowSavedJobs(!showSavedJobs)}
                className="flex items-center justify-center gap-2 w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium mt-3"
              >
                <Bookmark className="w-4 h-4" />
                Saved
                {savedJobs.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedJobs.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION - FIXED HEADING */}
      <section style={{ backgroundColor: 'white', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ paddingRight: '20px' }}>
              <span style={{ color: '#0052FF', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                INTERNSHIPS &amp; ARTICLESHIP
              </span>
              {/* FIXED: Using display block to prevent line break issues */}
              <h1 style={{ 
                fontSize: '62px', 
                fontWeight: 'bold', 
                color: '#1a1a1a', 
                marginTop: '16px', 
                marginBottom: '24px', 
                lineHeight: '1.1'
              }}>
                <span style={{ display: 'block' }}>Discover Entry-Level</span>
                <span style={{ display: 'block', color: '#0052FF' }}>Finance Opportunities</span>
              </h1>
               <p style={{ 
          fontSize: '21px', 
          color: '#666', 
          marginBottom: '40px', 
          lineHeight: 1.6 
        }}>
          Explore the latest internships opportunities from companies across India. Build practical skills, gain industry exposure, and take the first step toward your finance career.
        </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap' }}>
                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flex: '1 1 0',
                  minWidth: '0'
                }}>
                  <div style={{ width: '52px', height: '52px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BadgeCheck style={{ color: '#16a34a', width: '26px', height: '26px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a' }}>{allJobs.length}+</p>
                    <p style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>Active Opportunities</p>
                  </div>
                </div>

                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flex: '1 1 0',
                  minWidth: '0'
                }}>
                  <div style={{ width: '44px', height: '44px', background: '#faf5ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 style={{ color: '#9333ea', width: '22px', height: '22px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a' }}>
                      {new Set(allJobs.map(j => j.company)).size}+
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>Companies Hiring</p>
                  </div>
                </div>

                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '24px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flex: '1.3 1 0',
                  minWidth: '0'
                }}>
                  <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlarmClock style={{ color: '#dc2626', width: '24px', height: '24px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', whiteSpace: 'nowrap', margin: 0, lineHeight: '30px' }}>Updated Daily</p>
                    <p style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>New Opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="hero-image-container">
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/Find_my_first_internship.png"
                    alt="Find My First Job"
                    style={{
                      width: '650px',
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxHeight: '650px'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.parentElement
                      if (fallback) {
                        fallback.innerHTML = `<div style="font-size: 80px; opacity: 0.3;">🎯</div>`
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH FILTERS */}
      <section style={{ backgroundColor: 'white', paddingTop: '12px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container-custom">
          <div style={{ background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr 0.9fr 0.7fr', gap: '10px', marginBottom: '10px' }}>
              <div style={{ position: 'relative' }}>
                <label className="search-input-label">Search Opportunities</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Internship title, skills or company"
                    className="search-input-box"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value
                      setSearchQuery(value)
                      setShowSearchSuggestions(true)
                      runSearchQuery(value)
                    }}
                    onFocus={() => { if (searchQuery.trim()) setShowSearchSuggestions(true) }}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 150)}
                  />
                  <Search size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000000' }} />
                  {showSearchSuggestions && getSearchSuggestions().length > 0 && (
                    <div className="autosuggest-dropdown">
                      {getSearchSuggestions().map((suggestion, idx) => (
                        <div
                          key={`${suggestion}-${idx}`}
                          className="autosuggest-item"
                          onMouseDown={() => {
                            setSearchQuery(suggestion)
                            runSearchQuery(suggestion)
                            setShowSearchSuggestions(false)
                          }}
                        >
                          <Search size={14} style={{ color: '#999', flexShrink: 0 }} />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label className="search-input-label">Location</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Any location"
                    className="search-input-box"
                    value={locationQuery}
                    onChange={(e) => {
                      const value = e.target.value
                      setLocationQuery(value)
                      setShowLocationSuggestions(true)
                      runLocationQuery(value)
                    }}
                    onFocus={() => { if (locationQuery.trim()) setShowLocationSuggestions(true) }}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 150)}
                  />
                  <MapPin size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000000' }} />
                  {showLocationSuggestions && getLocationSuggestions().length > 0 && (
                    <div className="autosuggest-dropdown">
                      {getLocationSuggestions().map((suggestion, idx) => (
                        <div
                          key={`${suggestion}-${idx}`}
                          className="autosuggest-item"
                          onMouseDown={() => {
                            setLocationQuery(suggestion)
                            runLocationQuery(suggestion)
                            setShowLocationSuggestions(false)
                          }}
                        >
                          <MapPin size={14} style={{ color: '#999', flexShrink: 0 }} />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="search-input-label">Experience Level</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    className="search-input-box" 
                    style={{ appearance: 'none', cursor: 'pointer' }}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === 'all') {
                        setJobs(allJobs)
                      } else {
                        const filtered = allJobs.filter(job => job.experience === value)
                        setJobs(filtered)
                      }
                    }}
                  >
                    <option value="all">All Experience</option>
                    <option value="0 - 1 Yrs">0 - 1 Yrs</option>
                  </select>
                  <ChevronDown size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button 
                  style={{ height: '52px', borderRadius: '6px', background: '#2563EB', color: 'white', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: 'none', cursor: 'pointer', transition: 'background 0.3s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)', whiteSpace: 'nowrap', width: '100%' }}
                  onClick={() => setJobs(allJobs)}
                >
                  <Search size={18} /> Search
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: '600', color: '#111827', fontSize: '16px', whiteSpace: 'nowrap' }}>Popular Searches:</span>
                {popularSearches.map((search) => (
                  <button 
                    key={search} 
                    style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '3px', paddingBottom: '3px', borderRadius: '9999px', background: '#EBF0FF', color: '#2563EB', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                    onClick={() => {
                      const filtered = allJobs.filter(job => 
                        job.title.toLowerCase().includes(search.toLowerCase()) ||
                        job.company.toLowerCase().includes(search.toLowerCase())
                      )
                      setJobs(filtered)
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
              <button 
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563EB', fontSize: '18px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setSearchQuery('')
                  setLocationQuery('')
                  setJobs(allJobs)
                }}
              >
                <RotateCcw size={17} /> Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS SECTION */}
      <section style={{ backgroundColor: '#f9fafb', paddingTop: '32px', paddingBottom: '48px' }}>
        <div className="container-custom">
          <div className="filter-wrapper" style={{ gap: '16px' }}>

            {/* SIDEBAR FILTERS */}
            <div className="filter-sidebar-wrapper" style={{ width: '260px' }}>
              <aside className="filter-sidebar" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px' }}>FILTERS</h3>
                  <button onClick={clearAllFilters} style={{ color: '#0052FF', fontSize: '14px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Clear All</button>
                </div>

                {activeFilters.length > 0 && (
                  <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {activeFilters.map(filter => (
                        <span key={filter} style={{ background: '#EBF0FF', color: '#0052FF', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          {filter.split('-').slice(1).join(' ')}
                          <button onClick={() => {
                            setActiveFilters(activeFilters.filter(f => f !== filter))
                            applyFilters()
                          }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Type */}
                <div className="filter-section" style={{ marginBottom: '14px', paddingBottom: '12px' }}>
                  <button onClick={() => toggleSection('jobType')} className="filter-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '15px' }}>Job Type</h4>
                    <ChevronDown size={18} style={{ color: '#999', transform: expandedSections.jobType ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.jobType && (
                    <div>
                      {jobTypeOptions.map((option) => (
                        <label key={option.label} className="filter-item" style={{ marginBottom: '8px' }}>
                          <input type="checkbox" 
                            checked={activeFilters.includes(`jobType-${option.value}`)}
                            onChange={() => toggleFilter('jobType', option.value)} 
                            style={{ width: '14px', height: '14px', marginRight: '10px' }}
                          />
                          <span className="label" style={{ fontSize: '14px' }}>{option.label}</span>
                          <span className="count" style={{ fontSize: '14px', padding: '0 6px', minWidth: '20px' }}>{option.count}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="filter-section" style={{ marginBottom: '14px', paddingBottom: '12px' }}>
                  <button onClick={() => toggleSection('location')} className="filter-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '15px' }}>Location</h4>
                    <ChevronDown size={18} style={{ color: '#999', transform: expandedSections.location ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.location && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search locations..."
                        className="search-input-filter"
                        style={{ height: '34px', fontSize: '13px', marginBottom: '8px', paddingLeft: '10px' }}
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                      />
                      <div className="filter-scroll-container" style={{ maxHeight: '200px' }}>
                        {displayedLocations.map((option) => (
                          <label key={option.label} className="filter-item" style={{ marginBottom: '7px' }}>
                            <input type="checkbox" 
                              checked={activeFilters.includes(`location-${option.value}`)}
                              onChange={() => toggleFilter('location', option.value)}
                              style={{ width: '14px', height: '14px', marginRight: '10px' }}
                            />
                            <span className="label" style={{ fontSize: '14px' }}>{option.label}</span>
                            <span className="count" style={{ fontSize: '14px', padding: '0 6px', minWidth: '20px' }}>{option.count}</span>
                          </label>
                        ))}
                      </div>
                      {filteredLocations.length > 5 && (
                        <button 
                          className="show-more-btn"
                          style={{ fontSize: '12px' }}
                          onClick={() => setShowAllLocations(!showAllLocations)}
                        >
                          {showAllLocations ? (
                            <>Show Less <ChevronUp size={13} /></>
                          ) : (
                            <>Show More <Plus size={13} /></>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div className="filter-section" style={{ marginBottom: '14px', paddingBottom: '12px' }}>
                  <button onClick={() => toggleSection('experience')} className="filter-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '15px' }}>Experience Level</h4>
                    <ChevronDown size={18} style={{ color: '#999', transform: expandedSections.experience ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.experience && (
                    <div>
                      {experienceOptions.map((option) => (
                        <label key={option.label} className="filter-item" style={{ marginBottom: '8px' }}>
                          <input type="checkbox" 
                            checked={activeFilters.includes(`experience-${option.value}`)}
                            onChange={() => toggleFilter('experience', option.value)}
                            style={{ width: '14px', height: '14px', marginRight: '10px' }}
                          />
                          <span className="label" style={{ fontSize: '14px' }}>{option.label}</span>
                          <span className="count" style={{ fontSize: '14px', padding: '0 6px', minWidth: '20px' }}>{option.count}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="filter-section" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                  <button onClick={() => toggleSection('skills')} className="filter-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '15px' }}>Skills</h4>
                    <ChevronDown size={18} style={{ color: '#999', transform: expandedSections.skills ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.skills && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search skills..."
                        className="search-input-filter"
                        style={{ height: '34px', fontSize: '13px', marginBottom: '8px', paddingLeft: '10px' }}
                        value={skillsSearch}
                        onChange={(e) => setSkillsSearch(e.target.value)}
                      />
                      <div className="filter-scroll-container" style={{ maxHeight: '200px' }}>
                        {displayedSkills.map((option) => (
                          <label key={option.label} className="filter-item" style={{ marginBottom: '7px' }}>
                            <input type="checkbox" 
                              checked={activeFilters.includes(`skills-${option.value}`)}
                              onChange={() => toggleFilter('skills', option.value)}
                              style={{ width: '14px', height: '14px', marginRight: '10px' }}
                            />
                            <span className="label" style={{ fontSize: '14px' }}>{option.label}</span>
                            <span className="count" style={{ fontSize: '14px', padding: '0 6px', minWidth: '20px' }}>{option.count}</span>
                          </label>
                        ))}
                      </div>
                      {filteredSkills.length > 5 && (
                        <button 
                          className="show-more-btn"
                          style={{ fontSize: '12px' }}
                          onClick={() => setShowAllSkills(!showAllSkills)}
                        >
                          {showAllSkills ? (
                            <>Show Less <ChevronUp size={13} /></>
                          ) : (
                            <>Show More <Plus size={13} /></>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="clear-all-bottom" style={{ marginTop: '12px', paddingTop: '12px' }}>
                  <button onClick={clearAllFilters} style={{ padding: '10px', fontSize: '14px' }}>
                    <RotateCw size={14} />
                    Clear All Filters
                  </button>
                </div>
              </aside>
            </div>

            {/* JOB LISTINGS */}
            <div className="jobs-container" style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: 'white', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', gap: '12px', flexWrap: 'nowrap' }}>
                <h2 style={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: '17px', whiteSpace: 'nowrap', flexShrink: 0 }}>{jobs.length}+ Active Opportunities</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>Sort by:</span>
                    <div className="sort-select-box">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                        style={{
                          fontSize: '14px',
                          height: '36px',
                          color: '#000000',
                          padding: '0 10px',
                          border: 'none',
                          borderRadius: '4px',
                          background: 'transparent',
                        }}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '3px', borderLeft: '1px solid #e5e7eb', paddingLeft: '12px' }}>
                    <button 
                      onClick={() => handleViewToggle('list')}
                      className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                      style={{ background: viewType === 'list' ? '#0052FF' : 'white', borderColor: viewType === 'list' ? '#0052FF' : '#ddd', color: viewType === 'list' ? 'white' : '#666', padding: '4px 8px' }}>
                      <List size={16} />
                    </button>
                    <button 
                      onClick={() => handleViewToggle('grid')}
                      className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                      style={{ background: viewType === 'grid' ? '#0052FF' : 'white', borderColor: viewType === 'grid' ? '#0052FF' : '#ddd', color: viewType === 'grid' ? 'white' : '#666', padding: '4px 8px' }}>
                      <LayoutGrid size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Cards - List View */}
              {viewType === 'list' ? (
                <div className="jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentJobs.map((job) => {
                    const isArticleshipJob = isArticleship(job);
                    return (
                      <div key={job.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px 20px', transition: 'box-shadow 0.3s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '14px', flex: 1 }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }} className={job.logoBg || 'bg-gray-600'}>
                              {job.companyLogo ? (
                                <img src={job.companyLogo} alt={job.company} style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '4px' }} />
                              ) : (
                                job.company?.substring(0, 2).toUpperCase() || 'IN'
                              )}
                            </div>
                            
<div style={{ flex: 1 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
    <h3 className="job-title" style={{ fontSize: '18px' }}>{job.title}</h3>
    {job.isNew && <span className="new-badge" style={{ fontSize: '10px', padding: '1px 8px' }}>New</span>}
    <span className="posted-time" style={{ marginLeft: 'auto', fontSize: '13px' }}>{job.timeAgo || job.postedTime || 'Recently'}</span>
  </div>
  <p className="company-name company-name-gap" style={{ fontSize: '15px', marginBottom: '4px' }}>{job.company}</p>
  
  <div className="job-details-row job-details-gap" style={{ gap: '12px', marginBottom: '8px', marginTop: '2px' }}>
    <div className="job-location" style={{ fontSize: '14px' }}>
      <MapPin style={{ width: '13px', height: '13px', flexShrink: 0 }} />
      <span>{job.location}</span>
    </div>
    <div className="job-detail" style={{ fontSize: '14px' }}>
      <Building style={{ width: '13px', height: '13px', flexShrink: 0 }} />
      <span>{job.type}</span>
    </div>
                                {/* Show Experience ONLY for non-articleship jobs */}
                                {!isArticleshipJob && (
                                  <div className="job-detail" style={{ fontSize: '14px' }}>
                                    <Timer style={{ width: '13px', height: '13px', flexShrink: 0 }} />
                                    <span>{job.experience || '0 - 1 Yrs'}</span>
                                  </div>
                                )}
                                {/* Show Qualification for articleship jobs */}
                                {isArticleshipJob && job.qualifications && (
                                  <div className="job-detail" style={{ fontSize: '14px' }}>
                                    <Award style={{ width: '13px', height: '13px', flexShrink: 0 }} />
                                    <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {job.qualifications}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <p className="job-description" style={{ fontSize: '14px', marginBottom: '10px' }}>
                                {job.shortDescription || job.description || job.overview || 'No description available'}
                              </p>
                              
                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', width: '100%' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', flex: 1 }}>
                                  {job.skills?.slice(0, 4).map((skill) => (
                                    <span key={skill} className="skill-badge" style={{ fontSize: '11px', padding: '2px 8px' }}>{normalizeSkill(skill)}</span>
                                  ))}
                                  {job.skills?.length > 4 && (
                                    <span style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center' }}>+{job.skills.length - 4}</span>
                                  )}
                                </div>
                                <button 
                                  className="view-details-btn" 
                                  onClick={() => handleViewDetails(job.slug)}
                                  style={{ padding: '4px 16px', fontSize: '14px', marginLeft: '12px' }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0, marginLeft: '10px' }}>
                            <button 
                              onClick={() => toggleSaveJob(job.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                            >
                              <Bookmark className={`bookmark-icon ${savedJobs.some(j => j.id === job.id) ? 'saved' : ''}`} style={{ width: '20px', height: '20px' }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="jobs-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {currentJobs.map((job) => {
                    const isArticleshipJob = isArticleship(job);
                    return (
                      <div key={job.id} className="grid-job-card" style={{ padding: '16px' }}>
                        <div className="grid-job-header" style={{ marginBottom: '8px' }}>
                          <div className="grid-job-company">
                            <div className={`grid-job-logo ${job.logoBg || 'bg-gray-600'}`} style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                              {job.companyLogo ? (
                                <img src={job.companyLogo} alt={job.company} style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px' }} />
                              ) : (
                                job.company?.substring(0, 2).toUpperCase() || 'IN'
                              )}
                            </div>
                          <div className="grid-job-info">
  <h3 className="grid-job-title" style={{ fontSize: '16px' }}>{job.title}</h3>
  <span className="grid-job-company-name" style={{ fontSize: '14px' }}>{job.company}</span>
  <div className="grid-job-badges">
    {job.isNew && <span className="grid-job-new-badge" style={{ fontSize: '10px', padding: '1px 6px' }}>New</span>}
  </div>
</div>
                          </div>
                          <div className="grid-job-actions">
                            <button 
                              onClick={() => toggleSaveJob(job.id)}
                              className={`grid-job-bookmark ${savedJobs.some(j => j.id === job.id) ? 'saved' : ''}`}
                            >
                              <Bookmark style={{ width: '16px', height: '16px' }} />
                            </button>
                            <span className="grid-job-time" style={{ fontSize: '13px' }}>{job.timeAgo || job.postedTime || 'Recently'}</span>
                          </div>
                        </div>
                        
                        <div className="grid-job-details" style={{ gap: '2px', marginBottom: '8px' }}>
                          <div className="grid-job-location-text" style={{ fontSize: '14px' }}>
                            <MapPin style={{ width: '13px', height: '14px', flexShrink: 0 }} />
                            <span>{job.location}</span>
                          </div>
                          <div className="grid-job-type-text" style={{ fontSize: '14px' }}>
                            <span>
                              <Building style={{ width: '13px', height: '13px' }} />
                              {job.type}
                            </span>
                            {/* Show Experience ONLY for non-articleship jobs */}
                            {!isArticleshipJob && (
                              <span>
                                <Timer style={{ width: '13px', height: '13px' }} />
                                {job.experience || '0 - 1 Yrs'}
                              </span>
                            )}
                            {/* Show Qualification for articleship jobs */}
                            {isArticleshipJob && job.qualifications && (
                              <span style={{ fontSize: '14px', color: '#000000' }}>
                                <Award style={{ width: '13px', height: '13px' }} />
                                {job.qualifications.length > 30 ? job.qualifications.substring(0, 30) + '...' : job.qualifications}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="grid-job-description" style={{ fontSize: '14px', marginBottom: '8px' }}>
                          {job.shortDescription || job.description || job.overview || 'No description available'}
                        </p>
                        
                        <div className="grid-job-footer" style={{ paddingTop: '8px' }}>
                          <div className="grid-job-skills" style={{ gap: '3px' }}>
                            {job.skills?.slice(0, 3).map((skill) => (
                              <span key={skill} className="grid-job-skill" style={{ fontSize: '11px', padding: '2px 8px' }}>{normalizeSkill(skill)}</span>
                            ))}
                            {job.skills?.length > 3 && (
                              <span className="grid-job-skill-count" style={{ fontSize: '11px' }}>+{job.skills.length - 3}</span>
                            )}
                          </div>
                          <button 
                            className="grid-job-view-btn" 
                            onClick={() => handleViewDetails(job.slug)}
                            style={{ padding: '4px 14px', fontSize: '13px' }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '32px' }}>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <button 
                      key={pageNumber} 
                      onClick={() => handlePageChange(pageNumber)} 
                      className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      style={{ width: '38px', height: '38px', fontSize: '14px' }}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                  style={{ padding: '6px 14px', fontSize: '14px' }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section style={{ background: 'linear-gradient(to right, #f0f8ff, #f3f0ff)', paddingTop: '40px', paddingBottom: '40px', borderTop: '1px solid #e5e7eb' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: '#0052FF', color: 'white', borderRadius: '12px' }}>
                <Bell style={{ width: '26px', height: '26px' }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '2px' }}>Don't miss new opportunities!</h3>
              <p style={{ color: '#000000', fontSize: '16px' }}>Get daily alerts for the latest entry-level finance internships and articleship.</p>
            </div>
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '240px',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    paddingTop: '9px',
                    paddingBottom: '9px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '17px',
                    color: '#000000',
                    outline: 'none',
                  }}
                />
                {emailStatus === 'success' && (
                  <p style={{ marginTop: '8px', fontSize: '16px', color: '#16a34a' }}>✓ Subscribed successfully!</p>
                )}
                {emailStatus === 'error' && (
                  <p style={{ marginTop: '8px', fontSize: '16px', color: '#dc2626' }}>✗ Failed to subscribe. Please try again.</p>
                )}
                {emailStatus === 'idle' && (
                  <p style={{ marginTop: '8px', fontSize: '16px', color: '#000000' }}>No spam. Unsubscribe anytime.</p>
                )}
                {emailStatus === 'sending' && (
                  <p style={{ marginTop: '8px', fontSize: '16px', color: '#666' }}>Sending...</p>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={emailStatus === 'sending'}
                style={{
                  whiteSpace: 'nowrap',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  paddingTop: '9px',
                  paddingBottom: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '15px',
                  height: '44px',
                  opacity: emailStatus === 'sending' ? 0.7 : 1,
                  cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                <Send style={{ width: '16px', height: '16px' }} />
                Get Job Alerts
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}