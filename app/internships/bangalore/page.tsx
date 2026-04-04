import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Bangalore Internships 2026: 5000+ Verified Opportunities | Internify',
  description: 'Find 5000+ verified internships in Bangalore. Apply to frontend, data analyst, marketing internships at top companies like Google, Amazon, Flipkart. 100% free.',
  keywords: 'internships in Bangalore, Bangalore internships, jobs in Bangalore for students, tech internships Bangalore',
}

export default function BangalorePage() {
  // Sample internship data - replace with real data from your database
  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Google',
      location: 'Bangalore',
      stipend: '₹25,000 - ₹35,000/month',
      duration: '6 months',
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      type: 'In-office',
      postedDate: '2 days ago',
      logo: '/companies/google.png'
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      company: 'Amazon',
      location: 'Bangalore',
      stipend: '₹20,000 - ₹30,000/month',
      duration: '3-6 months',
      skills: ['SQL', 'Python', 'Excel'],
      type: 'Hybrid',
      postedDate: '1 day ago',
      logo: '/companies/amazon.png'
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Microsoft',
      location: 'Bangalore',
      stipend: '₹30,000 - ₹40,000/month',
      duration: '6 months',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      type: 'Remote',
      postedDate: '3 days ago',
      logo: '/companies/microsoft.png'
    },
    {
      id: 4,
      title: 'Digital Marketing Intern',
      company: 'Flipkart',
      location: 'Bangalore',
      stipend: '₹15,000 - ₹20,000/month',
      duration: '3 months',
      skills: ['SEO', 'Social Media', 'Content Writing'],
      type: 'In-office',
      postedDate: '5 days ago',
      logo: '/companies/flipkart.png'
    },
    {
      id: 5,
      title: 'Software Development Intern',
      company: 'Oracle',
      location: 'Bangalore',
      stipend: '₹35,000 - ₹45,000/month',
      duration: '6 months',
      skills: ['Java', 'Spring Boot', 'SQL'],
      type: 'Hybrid',
      postedDate: '1 week ago',
      logo: '/companies/oracle.png'
    },
  ]

  const topCompanies = ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Oracle', 'Adobe', 'Dell', 'Intel']

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs items={[
        { name: 'Internships', url: '/internships' },
        { name: 'Bangalore', url: '/internships/bangalore' }
      ]} />

      {/* Page Header */}
      <div className="mt-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Bangalore Internships 2026
        </h1>
        <p className="text-lg text-slate-600 mt-3 max-w-3xl">
          Find <strong>5000+ verified internships</strong> in Bangalore from top companies. 
          Apply to frontend, data analyst, marketing, and software development internships. 
          Updated daily. <strong>100% free</strong>.
        </p>
      </div>

      {/* Stats Section - Builds Trust */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">5000+</div>
          <div className="text-sm text-slate-600">Active Internships</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">200+</div>
          <div className="text-sm text-slate-600">Companies Hiring</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">₹15k-45k</div>
          <div className="text-sm text-slate-600">Monthly Stipend</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-600">90%</div>
          <div className="text-sm text-slate-600">Hiring Rate</div>
        </div>
      </div>

      {/* Popular Companies Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Top Companies Hiring in Bangalore</h2>
        <div className="flex flex-wrap gap-3">
          {topCompanies.map(company => (
            <Link
              key={company}
              href={`/companies/${company.toLowerCase()}`}
              className="px-4 py-2 bg-slate-100 hover:bg-blue-100 rounded-full text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {company}
            </Link>
          ))}
        </div>
      </div>

      {/* Internships List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Latest Internships in Bangalore</h2>
          <Link href="/internships/bangalore/all" className="text-blue-600 text-sm hover:underline">
            View all 5000+ →
          </Link>
        </div>

        <div className="space-y-4">
          {internships.map((internship) => (
            <div key={internship.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                      {internship.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        <Link href={`/internships/${internship.id}`} className="hover:text-blue-600">
                          {internship.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-500">{internship.company} • {internship.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="text-sm text-green-600 font-medium">💰 {internship.stipend}</span>
                    <span className="text-sm text-slate-500">⏱️ {internship.duration}</span>
                    <span className="text-sm text-slate-500">📍 {internship.type}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {internship.skills.map(skill => (
                      <span key={skill} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-slate-400">{internship.postedDate}</span>
                  <Link
                    href={`/apply/${internship.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Quick Apply →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section for Bangalore Internships */}
      <div className="mt-12 bg-slate-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Frequently Asked Questions About Bangalore Internships
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What is the average stipend for internships in Bangalore?</h3>
            <p className="text-sm text-slate-600">The average stipend for internships in Bangalore ranges from ₹15,000 to ₹35,000 per month. Tech companies like Google, Microsoft offer ₹35,000-₹50,000.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Which companies hire interns in Bangalore?</h3>
            <p className="text-sm text-slate-600">Top companies hiring interns in Bangalore include Google, Amazon, Microsoft, Flipkart, Oracle, Adobe, and 200+ startups.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Are there remote internships available in Bangalore?</h3>
            <p className="text-sm text-slate-600">Yes! Many Bangalore-based companies offer remote or hybrid internships. Use our "Remote" filter to find work-from-home opportunities.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">How to get an internship in Bangalore?</h3>
            <p className="text-sm text-slate-600">1. Create your profile on Internify, 2. Apply to matching internships, 3. Prepare for interviews, 4. Get hired! All free.</p>
          </div>
        </div>
      </div>

      {/* Related Pages - Internal Linking */}
      <div className="mt-8 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-3">Related Internships</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/internships/frontend-developer" className="text-sm text-blue-600 hover:underline">Frontend Developer Internships</Link>
          <Link href="/internships/data-analyst" className="text-sm text-blue-600 hover:underline">Data Analyst Internships</Link>
          <Link href="/internships/digital-marketing" className="text-sm text-blue-600 hover:underline">Digital Marketing Internships</Link>
          <Link href="/internships/mumbai" className="text-sm text-blue-600 hover:underline">Mumbai Internships</Link>
          <Link href="/internships/delhi" className="text-sm text-blue-600 hover:underline">Delhi Internships</Link>
        </div>
      </div>
    </div>
  )
}