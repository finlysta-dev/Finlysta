import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-[#FFD700] opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl">🔍</div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2540] font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform cursor-pointer w-full sm:w-auto">
              ← Back to Home
            </button>
          </Link>
          <Link href="/jobs">
            <button className="border-2 border-[#0A2540] text-[#0A2540] font-bold px-6 py-3 rounded-lg hover:bg-[#0A2540] hover:text-white transition-all cursor-pointer w-full sm:w-auto">
              Browse Jobs →
            </button>
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/jobs" className="text-sm text-blue-600 hover:underline">Jobs</Link>
            <Link href="/internships" className="text-sm text-blue-600 hover:underline">Internships</Link>
            <Link href="/blogs" className="text-sm text-blue-600 hover:underline">Blogs</Link>
            <Link href="/learn" className="text-sm text-blue-600 hover:underline">Learning Hub</Link>
          </div>
        </div>
      </div>
    </div>
  );
}