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
  GraduationCap, BriefcaseBusiness, Timer
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

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

  const popularSearches = ['Financial Analyst', 'Finance Intern', 'Accounts Executive', 'Audit Associate', 'FP&A Analyst']

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

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/opportunities')
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      
      const data = await response.json()
      
      const jobData = Array.isArray(data) 
        ? data.filter((item: any) => item.type === 'job')
        : []
      
      const formattedJobs = jobData.map((job: any) => {
        const formattedLocation = job.city && job.country 
          ? `${job.city}, ${job.country}`
          : job.location || 'India'
        
        let jobTypeDisplay = job.type || 'Full-time'
        if (job.type === 'job') jobTypeDisplay = 'Full-time'
        if (job.type === 'internship') jobTypeDisplay = 'Internship'
        
        let experienceDisplay = job.experience || '0 - 1 Yrs'
        
        const timeAgo = formatPostedTime(job.postedAt || new Date().toISOString())
        
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
          isNew: job.isNew || false,
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
        }
      })
      
      setAllJobs(formattedJobs)
      setJobs(formattedJobs)
      
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to load jobs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const toggleSaveJob = (jobId: string) => {
    let updatedSavedJobs: string[]
    let message: string
    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter(id => id !== jobId)
      message = 'Job removed from saved!'
    } else {
      updatedSavedJobs = [...savedJobs, jobId]
      message = 'Job saved successfully!'
    }
    setSavedJobs(updatedSavedJobs)
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedJobs))
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(null), 3000)
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
      if (type === 'trainee') return job.type?.toLowerCase().includes('trainee') || job.type?.toLowerCase().includes('graduate')
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
    return allJobs.filter(job => job.skills?.some(s => s.toLowerCase() === skill.toLowerCase())).length
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
    { label: 'Full-time Jobs', count: getJobTypeCount('full-time'), value: 'full-time' },
    { label: 'Internships', count: getJobTypeCount('internship'), value: 'internship' },
    { label: 'Trainee / Graduate Program', count: getJobTypeCount('trainee'), value: 'trainee' },
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
    { label: '1 - 2 Yrs', count: getExperienceCount('1-2'), value: '1-2' },
  ]

  const skillsOptions = [
    { label: 'Advanced Excel', count: getSkillsCount('advanced excel'), value: 'advanced-excel' },
    { label: 'Accounting', count: getSkillsCount('accounting'), value: 'accounting' },
    { label: 'Financial Analysis', count: getSkillsCount('financial analysis'), value: 'financial-analysis' },
    { label: 'SQL', count: getSkillsCount('sql'), value: 'sql' },
    { label: 'Tally', count: getSkillsCount('tally'), value: 'tally' },
    { label: 'MIS', count: getSkillsCount('mis'), value: 'mis' },
    { label: 'Communication', count: getSkillsCount('communication'), value: 'communication' },
    { label: 'Data Analysis', count: getSkillsCount('data analysis'), value: 'data-analysis' },
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

  const filteredJobs = jobs

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
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
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
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
      `}</style>

      {/* Save Message Toast */}
      {saveMessage && (
        <div className="save-message">
          <CheckCircle size={20} />
          {saveMessage}
        </div>
      )}

      {/* NAVIGATION - FIXED HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group">
              <Image src="/finlysta.png" alt="Finlysta Logo" width={160} height={36} priority className="object-contain transition-opacity duration-300 group-hover:opacity-90" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <div key={link.href} className="relative flex flex-col items-center">
                  <Link href={link.href} prefetch={!noPrefetch.includes(link.href)} className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
                    {link.label}
                  </Link>
                  {isActive && <div className="h-0.5 bg-[#0052FF] rounded-full w-full mt-1" />}
                </div>
              )
            })}

            <div className="relative resources-dropdown flex flex-col items-center">
              <button
                onClick={(e) => { e.stopPropagation(); setResourcesDropdownOpen(!resourcesDropdownOpen) }}
                className={`flex items-center gap-1 nav-link ${resourcesDropdownOpen || pathname?.startsWith("/resources") ? 'nav-link-active' : ''}`}
              >
                Resources
                <ChevronDown size={16} className={`transition-transform duration-200 ${resourcesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {resourcesItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setResourcesDropdownOpen(false)} className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${pathname === item.href ? 'text-[#0052FF] bg-blue-50' : 'text-gray-700 hover:text-[#0052FF] hover:bg-gray-50'}`}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:block">
            <button className="btn-primary">Find My First Job</button>
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
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2 rounded-lg transition text-base ${isActive ? 'text-[#0052FF] bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                    {link.label}
                  </Link>
                )
              })}
              <div className="border-t border-gray-100 pt-3 mt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Resources</p>
                {resourcesItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-lg transition text-sm ${pathname === item.href ? 'text-[#0052FF] bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <button className="btn-primary w-full mt-3">Find My First Job</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: 'white', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ paddingRight: '20px' }}>
              <span style={{ color: '#0052FF', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>JOBS</span>
              <h1 style={{ 
                fontSize: '72px', 
                fontWeight: 'bold', 
                color: '#1a1a1a', 
                marginTop: '16px', 
                marginBottom: '24px', 
                lineHeight: 1.1 
              }}>
                Find Your First<br />Step in <span style={{ color: '#0052FF' }}>Finance</span>
              </h1>
              <p style={{ 
                fontSize: '22px', 
                color: '#666', 
                marginBottom: '40px', 
                lineHeight: 1.8 
              }}>
                Explore entry-level finance jobs across India.<br /> Apply to opportunities that match your skills and<br />kickstart your career.
              </p>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  minWidth: '220px'
                }}>
                  <div style={{ width: '56px', height: '56px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BadgeCheck style={{ color: '#16a34a', width: '28px', height: '28px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>{allJobs.length}+</p>
                    <p style={{ fontSize: '15px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>Active Jobs</p>
                  </div>
                </div>

                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  minWidth: '140px'
                }}>
                  <div style={{ width: '44px', height: '44px', background: '#faf5ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 style={{ color: '#9333ea', width: '22px', height: '22px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                      {new Set(allJobs.map(j => j.company)).size}+
                    </p>
                    <p style={{ fontSize: '15px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>Companies Hiring</p>
                  </div>
                </div>

                <div style={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '22px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  minWidth: '250px'
                }}>
                  <div style={{ width: '44px', height: '44px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlarmClock style={{ color: '#dc2626', width: '22px', height: '22px' }} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', whiteSpace: 'nowrap', margin: 0, lineHeight: '30px' }}>Updated Daily</p>
                    <p style={{ fontSize: '15px', color: '#666', whiteSpace: 'nowrap', margin: 0 }}>New Opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="hero-image-container">
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/Find_my_first_job.png"
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
              <div>
                <label className="search-input-label">Search Jobs</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Job title, skills or company"
                    className="search-input-box"
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase()
                      const filtered = allJobs.filter(job => 
                        job.title.toLowerCase().includes(value) ||
                        job.company.toLowerCase().includes(value) ||
                        job.skills.some(s => s.toLowerCase().includes(value))
                      )
                      setJobs(filtered)
                    }}
                  />
                  <Search size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000000' }} />
                </div>
              </div>

              <div>
                <label className="search-input-label">Location</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Any location"
                    className="search-input-box"
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase()
                      const filtered = allJobs.filter(job => 
                        job.location.toLowerCase().includes(value) ||
                        job.city?.toLowerCase().includes(value)
                      )
                      setJobs(filtered)
                    }}
                  />
                  <MapPin size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000000' }} />
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
                    <option value="1 - 2 Yrs">1 - 2 Yrs</option>
                    <option value="2 - 3 Yrs">2 - 3 Yrs</option>
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
                onClick={() => setJobs(allJobs)}
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
          <div className="filter-wrapper">

            {/* SIDEBAR FILTERS */}
            <div className="filter-sidebar-wrapper">
              <aside className="filter-sidebar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3>FILTERS</h3>
                  <button onClick={clearAllFilters} style={{ color: '#0052FF', fontSize: '15px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Clear All</button>
                </div>

                {activeFilters.length > 0 && (
                  <div style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {activeFilters.map(filter => (
                        <span key={filter} style={{ background: '#EBF0FF', color: '#0052FF', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {filter.split('-').slice(1).join(' ')}
                          <button onClick={() => {
                            setActiveFilters(activeFilters.filter(f => f !== filter))
                            applyFilters()
                          }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Type */}
                <div className="filter-section">
                  <button onClick={() => toggleSection('jobType')} className="filter-header">
                    <h4>Job Type</h4>
                    <ChevronDown size={20} style={{ color: '#999', transform: expandedSections.jobType ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.jobType && (
                    <div>
                      {jobTypeOptions.map((option) => (
                        <label key={option.label} className="filter-item">
                          <input type="checkbox" 
                            checked={activeFilters.includes(`jobType-${option.value}`)}
                            onChange={() => toggleFilter('jobType', option.value)} />
                          <span className="label">{option.label}</span>
                          <span className="count">{option.count}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="filter-section">
                  <button onClick={() => toggleSection('location')} className="filter-header">
                    <h4>Location</h4>
                    <ChevronDown size={20} style={{ color: '#999', transform: expandedSections.location ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.location && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search locations..."
                        className="search-input-filter"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                      />
                      <div className="filter-scroll-container">
                        {displayedLocations.map((option) => (
                          <label key={option.label} className="filter-item">
                            <input type="checkbox" 
                              checked={activeFilters.includes(`location-${option.value}`)}
                              onChange={() => toggleFilter('location', option.value)} />
                            <span className="label">{option.label}</span>
                            <span className="count">{option.count}</span>
                          </label>
                        ))}
                      </div>
                      {filteredLocations.length > 5 && (
                        <button 
                          className="show-more-btn"
                          onClick={() => setShowAllLocations(!showAllLocations)}
                        >
                          {showAllLocations ? (
                            <>Show Less <ChevronUp size={14} /></>
                          ) : (
                            <>Show More <Plus size={14} /></>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div className="filter-section">
                  <button onClick={() => toggleSection('experience')} className="filter-header">
                    <h4>Experience Level</h4>
                    <ChevronDown size={20} style={{ color: '#999', transform: expandedSections.experience ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.experience && (
                    <div>
                      {experienceOptions.map((option) => (
                        <label key={option.label} className="filter-item">
                          <input type="checkbox" 
                            checked={activeFilters.includes(`experience-${option.value}`)}
                            onChange={() => toggleFilter('experience', option.value)} />
                          <span className="label">{option.label}</span>
                          <span className="count">{option.count}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="filter-section" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                  <button onClick={() => toggleSection('skills')} className="filter-header">
                    <h4>Skills</h4>
                    <ChevronDown size={20} style={{ color: '#999', transform: expandedSections.skills ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {expandedSections.skills && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search skills..."
                        className="search-input-filter"
                        value={skillsSearch}
                        onChange={(e) => setSkillsSearch(e.target.value)}
                      />
                      <div className="filter-scroll-container">
                        {displayedSkills.map((option) => (
                          <label key={option.label} className="filter-item">
                            <input type="checkbox" 
                              checked={activeFilters.includes(`skills-${option.value}`)}
                              onChange={() => toggleFilter('skills', option.value)} />
                            <span className="label">{option.label}</span>
                            <span className="count">{option.count}</span>
                          </label>
                        ))}
                      </div>
                      {filteredSkills.length > 5 && (
                        <button 
                          className="show-more-btn"
                          onClick={() => setShowAllSkills(!showAllSkills)}
                        >
                          {showAllSkills ? (
                            <>Show Less <ChevronUp size={14} /></>
                          ) : (
                            <>Show More <Plus size={14} /></>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="clear-all-bottom">
                  <button onClick={clearAllFilters}>
                    <RotateCw size={16} />
                    Clear All Filters
                  </button>
                </div>
              </aside>
            </div>

            {/* JOB LISTINGS */}
            <div className="jobs-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: 'white', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h2 style={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: '18px' }}>{jobs.length}+ Active Jobs</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                      style={{
                        fontSize: '16px',
                        height: '42px',
                        color: '#000000',
                        padding: '0 12px',
                      }}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid #e5e7eb', paddingLeft: '18px' }}>
                    <button 
                      onClick={() => handleViewToggle('list')}
                      className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                      style={{ background: viewType === 'list' ? '#0052FF' : 'white', borderColor: viewType === 'list' ? '#0052FF' : '#ddd', color: viewType === 'list' ? 'white' : '#666' }}>
                      <List size={18} />
                    </button>
                    <button 
                      onClick={() => handleViewToggle('grid')}
                      className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                      style={{ background: viewType === 'grid' ? '#0052FF' : 'white', borderColor: viewType === 'grid' ? '#0052FF' : '#ddd', color: viewType === 'grid' ? 'white' : '#666' }}>
                      <LayoutGrid size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Cards - List View */}
              {viewType === 'list' ? (
                <div className="jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentJobs.map((job) => (
                    <div key={job.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px', transition: 'box-shadow 0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                          <div style={{ width: '52px', height: '52px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px', flexShrink: 0 }} className={job.logoBg || 'bg-gray-600'}>
                            {job.companyLogo ? (
                              <img src={job.companyLogo} alt={job.company} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }} />
                            ) : (
                              job.company?.substring(0, 2).toUpperCase() || 'IN'
                            )}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <h3 className="job-title">{job.title}</h3>
                              {job.isNew && <span className="new-badge">New</span>}
                              <span className="posted-time" style={{ marginLeft: 'auto' }}>{job.timeAgo || job.postedTime || 'Recently'}</span>
                            </div>
                            <p className="company-name company-name-gap">{job.company}</p>
                            
                            <div className="job-details-row job-details-gap">
                              <div className="job-location">
                                <MapPin style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                                <span>{job.location}</span>
                              </div>
                              <div className="job-detail">
                                <Building style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                                <span>{job.type}</span>
                              </div>
                              <div className="job-detail">
                                <Timer style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                                <span>{job.experience || '0 - 1 Yrs'}</span>
                              </div>
                            </div>
                            
                            <p className="job-description" style={{ marginBottom: '12px' }}>
                              {job.shortDescription || job.description || job.overview || 'No description available'}
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '14px', width: '100%' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                                {job.skills?.slice(0, 4).map((skill) => (
                                  <span key={skill} className="skill-badge">{skill}</span>
                                ))}
                                {job.skills?.length > 4 && (
                                  <span style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center' }}>+{job.skills.length - 4}</span>
                                )}
                              </div>
                              <button 
                                className="view-details-btn" 
                                onClick={() => handleViewDetails(job.slug)}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0, marginLeft: '12px' }}>
                          <button 
                            onClick={() => toggleSaveJob(job.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          >
                            <Bookmark className={`bookmark-icon ${savedJobs.includes(job.id) ? 'saved' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="jobs-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  {currentJobs.map((job) => (
                    <div key={job.id} className="grid-job-card">
                      <div className="grid-job-header">
                        <div className="grid-job-company">
                          <div className={`grid-job-logo ${job.logoBg || 'bg-gray-600'}`}>
                            {job.companyLogo ? (
                              <img src={job.companyLogo} alt={job.company} style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }} />
                            ) : (
                              job.company?.substring(0, 2).toUpperCase() || 'IN'
                            )}
                          </div>
                          <div className="grid-job-info">
                            <h3 className="grid-job-title">{job.title}</h3>
                            <span className="grid-job-company-name">{job.company}</span>
                            <div className="grid-job-badges">
                              {job.isNew && <span className="grid-job-new-badge">New</span>}
                            </div>
                          </div>
                        </div>
                        <div className="grid-job-actions">
                          <button 
                            onClick={() => toggleSaveJob(job.id)}
                            className={`grid-job-bookmark ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                          >
                            <Bookmark style={{ width: '18px', height: '18px' }} />
                          </button>
                          <span className="grid-job-time">{job.timeAgo || job.postedTime || 'Recently'}</span>
                        </div>
                      </div>
                      
                      <div className="grid-job-details">
                        <div className="grid-job-location-text">
                          <MapPin style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                          <span>{job.location}</span>
                        </div>
                        <div className="grid-job-type-text">
                          <span>
                            <Building style={{ width: '15px', height: '15px' }} />
                            {job.type}
                          </span>
                          <span>
                            <Timer style={{ width: '15px', height: '15px' }} />
                            {job.experience || '0 - 1 Yrs'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="grid-job-description">
                        {job.shortDescription || job.description || job.overview || 'No description available'}
                      </p>
                      
                      <div className="grid-job-footer">
                        <div className="grid-job-skills">
                          {job.skills?.slice(0, 3).map((skill) => (
                            <span key={skill} className="grid-job-skill">{skill}</span>
                          ))}
                          {job.skills?.length > 3 && (
                            <span className="grid-job-skill-count">+{job.skills.length - 3}</span>
                          )}
                        </div>
                        <button 
                          className="grid-job-view-btn" 
                          onClick={() => handleViewDetails(job.slug)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <button 
                      key={pageNumber} 
                      onClick={() => handlePageChange(pageNumber)} 
                      className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
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
              <p style={{ color: '#000000', fontSize: '16px' }}>Get daily alerts for the latest entry-level finance jobs.</p>
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