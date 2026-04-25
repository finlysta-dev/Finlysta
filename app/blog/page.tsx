'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Calendar, User, Clock, ArrowRight, BookOpen, TrendingUp, Eye, Heart, Share2, Zap } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar?: string;
  readTime: string;
  views: number;
  likes: number;
  publishedAt: string;
  tags: string[];
  isFeatured: boolean;
  seoKeywords: string[];
  searchVolume?: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // SEO-Optimized Blog Posts targeting high-volume keywords
  useEffect(() => {
    // Simulate API call - Replace with actual API endpoint
    const seoOptimizedPosts: BlogPost[] = [
      {
        id: '1',
        title: 'How to Get a Financial Analyst Internship with No Experience',
        slug: 'how-to-get-financial-analyst-internship-no-experience',
        excerpt: 'Breaking into finance without experience can feel impossible. Here are proven strategies to land your first financial analyst internship, even with zero experience. Learn from successful candidates who made it happen.',
        content: '',
        image: '/blog/financial-analyst-internship.jpg',
        category: 'Career Advice',
        author: 'Priya Sharma',
        readTime: '8 min',
        views: 2450,
        likes: 189,
        publishedAt: '2024-03-15',
        tags: ['Internship', 'Career Tips', 'Beginners', 'No Experience', 'Zero Experience'],
        isFeatured: true,
        seoKeywords: ['how to get an internship in finance', 'how to get a finance internship with no experience', 'zero experience finance jobs', 'internship for finance students', 'financial analyst internship for freshers'],
        searchVolume: '88,888'
      },
      {
        id: '2',
        title: 'Top 10 Entry Level Financial Analyst Jobs for Freshers in 2024',
        slug: 'top-entry-level-financial-analyst-jobs-freshers',
        excerpt: 'Discover the best entry level financial analyst positions for fresh graduates. From investment banking to corporate finance, find your perfect starting role with salary insights and application tips.',
        content: '',
        image: '/blog/entry-level-jobs.jpg',
        category: 'Job Search',
        author: 'Rahul Mehta',
        readTime: '10 min',
        views: 1890,
        likes: 156,
        publishedAt: '2024-03-10',
        tags: ['Entry Level', 'Freshers', 'Job Search', 'Career Guide'],
        isFeatured: true,
        seoKeywords: ['entry level financial analyst jobs', 'entry level financial analyst jobs and internships', 'financial analyst jobs for freshers', 'entry level analyst jobs', 'finance entry level jobs'],
        searchVolume: '88,888'
      },
      {
        id: '3',
        title: 'MBA Finance Summer Internship 2024-2025: Complete Guide',
        slug: 'mba-finance-summer-internship-guide',
        excerpt: 'Your complete guide to securing top MBA finance summer internships at Goldman Sachs, JP Morgan, and more. Application deadlines, interview tips, and everything you need to know.',
        content: '',
        image: '/blog/mba-internship.jpg',
        category: 'MBA Guide',
        author: 'Anjali Desai',
        readTime: '12 min',
        views: 3200,
        likes: 278,
        publishedAt: '2024-03-05',
        tags: ['MBA', 'Summer Internship', 'Investment Banking', 'Top Companies'],
        isFeatured: true,
        seoKeywords: ['mba finance summer internship', 'summer internship for mba finance students', 'summer internship for finance mba students', 'summer internship finance', 'mba in finance internship'],
        searchVolume: '26,000'
      },
      {
        id: '4',
        title: 'Walk-in Interviews for Financial Analyst in Mumbai - March 2024',
        slug: 'walkin-interviews-financial-analyst-mumbai',
        excerpt: 'Find upcoming walk-in interviews for financial analyst positions in Mumbai. Top companies hiring immediately. Carry your resume and get hired on the spot.',
        content: '',
        image: '/blog/walkin-interview.jpg',
        category: 'Job Alerts',
        author: 'Vikram Singh',
        readTime: '6 min',
        views: 1560,
        likes: 98,
        publishedAt: '2024-02-28',
        tags: ['Walk-in', 'Mumbai', 'Immediate Hiring', 'Jobs'],
        isFeatured: false,
        seoKeywords: ['walkin for financial analyst in mumbai', 'openings for financial analyst in mumbai', 'financial analyst jobs mumbai', 'financial analyst interview'],
        searchVolume: '10,000'
      },
      {
        id: '5',
        title: 'Remote Financial Analyst Internships in India - Work From Home',
        slug: 'remote-financial-analyst-internships-india',
        excerpt: 'Top companies hiring for remote financial analyst internships. Work from home opportunities across India with competitive stipends. Apply now for immediate start.',
        content: '',
        image: '/blog/remote-internship.jpg',
        category: 'Remote Jobs',
        author: 'Neha Gupta',
        readTime: '9 min',
        views: 2100,
        likes: 167,
        publishedAt: '2024-02-20',
        tags: ['Remote', 'Work From Home', 'WFH', 'Internships'],
        isFeatured: false,
        seoKeywords: ['financial analyst remote internship', 'financial analyst remote jobs', 'entry level financial analyst work from home', 'mba finance internship work from home'],
        searchVolume: '10,000'
      },
      {
        id: '6',
        title: 'Amazon Financial Analyst Internship: How to Get Selected',
        slug: 'amazon-financial-analyst-internship-guide',
        excerpt: 'Complete guide to Amazon\'s financial analyst internship program. Application process, interview questions, salary, and tips from successful candidates who got selected.',
        content: '',
        image: '/blog/amazon-internship.jpg',
        category: 'Company Guide',
        author: 'Amit Patel',
        readTime: '11 min',
        views: 980,
        likes: 72,
        publishedAt: '2024-02-15',
        tags: ['Amazon', 'FAANG', 'Company Guide', 'High Paying'],
        isFeatured: false,
        seoKeywords: ['amazon financial analyst internship', 'amazon finance internship', 'financial analyst internship amazon'],
        searchVolume: '70'
      },
      {
        id: '7',
        title: 'Paid Financial Analyst Internship: Top Companies with High Stipends',
        slug: 'paid-financial-analyst-internship-high-stipend',
        excerpt: 'Find the best paid financial analyst internships with stipends up to ₹50,000/month. List of companies offering competitive pay and how to apply.',
        content: '',
        image: '/blog/paid-internship.jpg',
        category: 'High Paying',
        author: 'Priya Sharma',
        readTime: '7 min',
        views: 890,
        likes: 65,
        publishedAt: '2024-02-10',
        tags: ['Paid Internship', 'High Stipend', 'Money'],
        isFeatured: false,
        seoKeywords: ['financial analyst paid internship', 'paid finance internship', 'finance internship with stipend', 'financial analyst internship paid'],
        searchVolume: '10'
      },
      {
        id: '8',
        title: 'Financial Analyst Internship Interview Questions & Answers',
        slug: 'financial-analyst-internship-interview-questions',
        excerpt: 'Most commonly asked interview questions for financial analyst internships. Technical questions, behavioral questions, and how to answer them effectively.',
        content: '',
        image: '/blog/interview-questions.jpg',
        category: 'Interview Prep',
        author: 'Rahul Mehta',
        readTime: '14 min',
        views: 3450,
        likes: 298,
        publishedAt: '2024-02-05',
        tags: ['Interview', 'Preparation', 'Questions', 'Tips'],
        isFeatured: true,
        seoKeywords: ['financial analyst internship interview questions', 'financial analyst intern interview questions', 'entry level financial analyst interview questions'],
        searchVolume: '88,888'
      },
      {
        id: '9',
        title: 'Financial Analyst Jobs and Internships: Complete Career Guide 2024',
        slug: 'financial-analyst-jobs-internships-career-guide',
        excerpt: 'Everything you need to know about financial analyst careers. From internships to full-time roles, salary expectations, required skills, and growth opportunities.',
        content: '',
        image: '/blog/career-guide.jpg',
        category: 'Career Guide',
        author: 'Anjali Desai',
        readTime: '15 min',
        views: 4200,
        likes: 356,
        publishedAt: '2024-01-28',
        tags: ['Career Guide', 'Complete Guide', 'Salary', 'Growth'],
        isFeatured: true,
        seoKeywords: ['financial analyst jobs and internships', 'financial analyst careers', 'financial analyst salary', 'how to become a financial analyst'],
        searchVolume: '10'
      },
      {
        id: '10',
        title: 'Summer Financial Analyst Internship 2024: Application Deadlines',
        slug: 'summer-financial-analyst-internship-deadlines',
        excerpt: 'Don\'t miss these summer financial analyst internship application deadlines. Top investment banks and corporations hiring now for summer 2024 positions.',
        content: '',
        image: '/blog/summer-internship.jpg',
        category: 'Job Alerts',
        author: 'Vikram Singh',
        readTime: '8 min',
        views: 1670,
        likes: 123,
        publishedAt: '2024-01-20',
        tags: ['Summer', 'Deadlines', 'Investment Banking'],
        isFeatured: false,
        seoKeywords: ['financial analyst summer internship', 'summer financial analyst internship', 'summer internship finance', 'junior financial analyst internship'],
        searchVolume: '27,000'
      },
      {
        id: '11',
        title: 'Financial Analyst Internship Near Me: Location-Based Search Guide',
        slug: 'financial-analyst-internship-near-me',
        excerpt: 'Find financial analyst internships near your location. Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune - complete list of local opportunities.',
        content: '',
        image: '/blog/near-me.jpg',
        category: 'Location Guide',
        author: 'Neha Gupta',
        readTime: '10 min',
        views: 890,
        likes: 67,
        publishedAt: '2024-01-15',
        tags: ['Location', 'Near Me', 'City-wise', 'Local Jobs'],
        isFeatured: false,
        seoKeywords: ['financial analyst internship near me', 'financial analyst jobs entry level near me', 'financial analyst entry level jobs near me', 'entry level financial analyst jobs near me'],
        searchVolume: '70'
      },
      {
        id: '12',
        title: 'Which Internship is Best for Finance Students? Complete Comparison',
        slug: 'best-internship-for-finance-students',
        excerpt: 'Investment banking vs corporate finance vs equity research vs fintech. Compare different finance internships and find which career path suits you best.',
        content: '',
        image: '/blog/finance-career.jpg',
        category: 'Career Advice',
        author: 'Amit Patel',
        readTime: '12 min',
        views: 2340,
        likes: 189,
        publishedAt: '2024-01-10',
        tags: ['Career Comparison', 'Finance Path', 'Specialization'],
        isFeatured: false,
        seoKeywords: ['which internship is best for finance students', 'best finance internship', 'finance career path', 'investment banking vs corporate finance'],
        searchVolume: '14'
      }
    ];
    
    setBlogPosts(seoOptimizedPosts);
    setFilteredPosts(seoOptimizedPosts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...blogPosts];
    
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.seoKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, blogPosts]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const categories = ['all', 'Career Advice', 'Job Search', 'MBA Guide', 'Job Alerts', 'Remote Jobs', 'Company Guide', 'High Paying', 'Interview Prep', 'Career Guide', 'Location Guide'];
  const featuredPosts = blogPosts.filter(post => post.isFeatured);
  const trendingPosts = blogPosts.filter(post => post.views > 2000);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags - These will be in layout or page metadata */}
      <div className="hidden">
        <h1>Financial Analyst Jobs & Internships | Career Guide for Finance Students</h1>
        <h2>Entry Level Financial Analyst Opportunities in India</h2>
        <meta name="keywords" content="financial analyst internship, entry level financial analyst jobs, financial analyst internship near me, mba finance summer internship, financial analyst remote jobs, how to get a finance internship, internship for finance students, financial analyst jobs for freshers, walkin for financial analyst in mumbai, amazon financial analyst internship" />
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium">Financial Analyst Blog</span>
          </div>
        </div>
      </div>

      {/* Hero Section - SEO Optimized */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Financial Analyst Jobs & Internships Blog</h1>
          <p className="text-emerald-100 text-lg mb-4 max-w-2xl">Your ultimate resource for entry level financial analyst careers, internship guides, interview tips, and job alerts.</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search financial analyst internships, jobs, or interview tips..."
                className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-emerald-100 text-xs mt-2">Popular: financial analyst internship, entry level jobs, MBA internship</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Categories Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Articles' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        {trendingPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Trending Articles</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">High Search Volume</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {trendingPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <BookOpen size={32} className="text-white/30" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="text-emerald-600 font-medium">{post.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Featured Articles</h2>
              <span className="text-xs text-gray-400">Most comprehensive guides</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <BookOpen size={48} className="text-white/30" />
                    </div>
                    <div className="p-5 md:w-3/5">
                      <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
                        <span className="font-medium">{post.category}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-gray-500">{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User size={14} />
                          <span>{post.author}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'Latest Articles'}
            </h2>
            <p className="text-sm text-gray-500">{filteredPosts.length} articles</p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                    <BookOpen size={32} className="text-gray-400" />
                    {post.searchVolume && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full">
                        {post.searchVolume}+ searches
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="text-emerald-600 font-medium">{post.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    
                    {/* Keywords as tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.seoKeywords.slice(0, 2).map((keyword, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SEO Newsletter Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Get Weekly Financial Analyst Job Alerts</h3>
          <p className="text-emerald-100 mb-4">Subscribe for entry level job notifications and internship updates</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 outline-none"
            />
            <button className="px-6 py-2 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
          <p className="text-emerald-100 text-xs mt-3">Get alerts for: financial analyst internship, entry level jobs, MBA internships</p>
        </div>
      </div>
    </div>
  );
}