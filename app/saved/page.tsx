"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, Briefcase, MapPin, Clock, Wallet, Trash2 } from "lucide-react";

interface SavedInternship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipendAmount: string | null;
  createdAt: string;
}

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedInternships, setSavedInternships] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      loadSavedInternships();
    }
  }, [session]);

  const loadSavedInternships = async () => {
    try {
      const savedIds = JSON.parse(localStorage.getItem("savedInternships") || "[]");
      
      if (savedIds.length === 0) {
        setSavedInternships([]);
        setLoading(false);
        return;
      }

      // Fetch internship details for each saved ID
      const internships = await Promise.all(
        savedIds.map(async (id: string) => {
          const res = await fetch(`/api/internships/${id}`);
          if (res.ok) {
            return await res.json();
          }
          return null;
        })
      );

      setSavedInternships(internships.filter(Boolean));
    } catch (error) {
      console.error("Error loading saved internships:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeSaved = (id: string) => {
    const savedIds = JSON.parse(localStorage.getItem("savedInternships") || "[]");
    const newSavedIds = savedIds.filter((savedId: string) => savedId !== id);
    localStorage.setItem("savedInternships", JSON.stringify(newSavedIds));
    setSavedInternships(savedInternships.filter(item => item.id !== id));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={28} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Saved Internships</h1>
        </div>

        {savedInternships.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved internships</h3>
            <p className="text-gray-500 mb-6">
              Save internships you're interested in and they'll appear here.
            </p>
            <Link
              href="/internships"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Briefcase size={18} />
              Browse Internships
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link href={`/internships/${internship.id}`}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {internship.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-1">{internship.company}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {internship.location || "Not specified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {internship.duration || "Not specified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet size={14} />
                        {internship.stipendAmount ? `₹${internship.stipendAmount}/mo` : "Unpaid"}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeSaved(internship.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}