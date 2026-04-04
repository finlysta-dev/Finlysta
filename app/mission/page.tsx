export const metadata = {
  title: "Our Mission | Internify",
  robots: {
    index: false,      // prevents indexing
    follow: true,      // keeps following links
  },
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Mission Section */}
      <section className="border-b border-gray-100 w-full">
        <div className="w-full px-6 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
            Our <span className="text-indigo-600">Mission</span>
          </h1>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            To help students access real, verified, and meaningful internship
            opportunities that genuinely shape their careers.
          </p>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            We believe every student deserves a fair opportunity to grow,
            prove their potential, and gain real-world experience. Too often,
            internship platforms are filled with unclear listings, fake
            opportunities, or confusing processes that create frustration
            instead of growth.
          </p>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            Internify was built to bring clarity and trust into the internship
            journey. We focus on authentic opportunities, structured profiles,
            and transparency — so students can concentrate on building skills
            instead of navigating uncertainty.
          </p>
          <p className="text-gray-700 text-lg leading-normal">
            Our mission goes beyond connecting candidates with companies. It is
            about building confidence, reducing friction, and creating an
            ecosystem where preparation truly meets opportunity.
          </p>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="border-b border-gray-100 w-full bg-gray-50">
        <div className="w-full px-6 md:px-10 lg:px-16 py-6 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            Why I Built Internify?
          </h2>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            In my final semester of college, I started actively exploring
            internships and job opportunities. What should have been an
            exciting step forward quickly turned into frustration.
          </p>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            Many listings felt unclear. Some seemed fake. Others lacked
            transparency about the role or even the company itself. It became
            difficult to distinguish genuine opportunities from noise.
          </p>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            I realized the issue wasn't a lack of talent — students were ready
            and capable. The real problem was the absence of a trusted,
            student-focused platform that respected their time and ambition.
          </p>
          <p className="text-gray-700 text-lg leading-normal mb-3">
            Internify was built to solve that problem — to create a
            transparent, skill-focused ecosystem where students can confidently
            take their first step toward meaningful careers.
          </p>
          <p className="font-medium text-gray-900 text-lg">
            — Founder, Internify
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white w-full">
        <div className="w-full px-6 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Built for students. Designed for growth. Focused on real opportunity.
          </h2>
          <p className="text-indigo-100 leading-normal text-lg">
            Helping students transition from learning to earning, from potential to performance.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 w-full mt-auto">
        <div className="w-full px-6 md:px-10 lg:px-16 py-3 max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Internify. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}