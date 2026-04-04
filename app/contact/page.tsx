"use client";
import { useState } from "react";
import {
  User,
  Building2,
  GraduationCap,
  Handshake,
  Newspaper,
  Mail,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ContactPage() {

  const [userType, setUserType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subjects: Record<string, string[]> = {

    student: [
      "Question about an internship",
      "Application issue",
      "Report fake internship",
      "Website bug / error",
      "Feature suggestion",
      "Account problem",
      "Other student query"
    ],

    recruiter: [
      "Post internship on Internify",
      "Hiring partnership",
      "Company verification",
      "Bulk hiring / multiple roles",
      "Employer branding",
      "Technical issue posting internship",
      "Other recruiter query"
    ],

    university: [
      "Campus hiring partnership",
      "Student internship opportunities",
      "University collaboration",
      "Career services partnership",
      "Event / workshop collaboration",
      "Other university inquiry"
    ],

    partner: [
      "Startup partnership",
      "Community collaboration",
      "Product integration",
      "Affiliate partnership",
      "Sponsorship opportunity",
      "Other partnership inquiry"
    ],

    media: [
      "Press inquiry",
      "Interview request",
      "Startup feature / coverage",
      "Media partnership",
      "Other media inquiry"
    ],

    general: [
      "General question",
      "Feedback",
      "Business inquiry",
      "Report an issue",
      "Other"
    ]
  };

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = new FormData(e.target);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      subject: form.get("subject"),
      message: form.get("message"),
      userType
    };

    try {

      const res = await fetch("/api/contact",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if(data.success){
        setSuccess(true);
        e.target.reset();
      } else {
        setError(data.error || "Something went wrong");
      }

    } catch(err){
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-gray-900">
             Have any doubts?
          </h1>

          <p className="text-gray-600 mt-3">
            Get in touch with us. Whether you're a student, recruiter, or partner, 
            we're here to help you.
          </p>

        </div>


        <div className="bg-white shadow-xl rounded-xl p-8">


          {/* USER TYPE */}

          <div className="mb-8">

            <p className="font-semibold text-gray-700 mb-3">
              I am a:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <button
                type="button"
                onClick={()=>setUserType("student")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="student" ? "bg-black text-white" : "bg-white"}`}
              >
                <User size={18}/> Student
              </button>

              <button
                type="button"
                onClick={()=>setUserType("recruiter")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="recruiter" ? "bg-black text-white" : "bg-white"}`}
              >
                <Building2 size={18}/> Recruiter
              </button>

              <button
                type="button"
                onClick={()=>setUserType("university")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="university" ? "bg-black text-white" : "bg-white"}`}
              >
                <GraduationCap size={18}/> University
              </button>

              <button
                type="button"
                onClick={()=>setUserType("partner")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="partner" ? "bg-black text-white" : "bg-white"}`}
              >
                <Handshake size={18}/> Partner
              </button>

              <button
                type="button"
                onClick={()=>setUserType("media")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="media" ? "bg-black text-white" : "bg-white"}`}
              >
                <Newspaper size={18}/> Media
              </button>

              <button
                type="button"
                onClick={()=>setUserType("general")}
                className={`border rounded-lg px-4 py-3 flex items-center gap-2 justify-center
                ${userType==="general" ? "bg-black text-white" : "bg-white"}`}
              >
                <Mail size={18}/> General
              </button>

            </div>
          </div>


          {/* SUCCESS */}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 flex items-center gap-2">
              <CheckCircle size={18}/>
              Message sent successfully!
            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle size={18}/>
              {error}
            </div>
          )}


          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="name"
              placeholder="Your Name"
              required
              className="border rounded-lg px-4 py-3 w-full"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="border rounded-lg px-4 py-3 w-full"
            />

            <input
              name="company"
              placeholder="Company / Organization (optional)"
              className="border rounded-lg px-4 py-3 w-full"
            />

            <select
              name="subject"
              required
              className="border rounded-lg px-4 py-3 w-full"
            >
              <option value="">Select subject</option>

              {subjects[userType].map((s,i)=>(
                <option key={i} value={s}>
                  {s}
                </option>
              ))}

            </select>

            <textarea
              name="message"
              rows={5}
              placeholder="Your message..."
              required
              className="border rounded-lg px-4 py-3 w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <Send size={18}/>
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>


       {/* INFO SECTION */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 mb-4">
              <span className="font-semibold text-gray-900">Recruiters:</span> Looking to hire interns? 
              Contact us here until our recruiter dashboard launches.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href="mailto:internifyhelp@gmail.com"
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors font-medium"
              >
                <Mail size={16} />
                internifyhelp@gmail.com
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              We typically respond within <span className="font-medium text-gray-700">24 hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}