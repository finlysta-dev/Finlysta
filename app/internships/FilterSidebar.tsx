"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw, ChevronRight, Globe, Laptop, Building2, Check, MapPin } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { Suspense } from "react";

// Complete Indian locations
const INDIAN_LOCATIONS = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Nagpur", "Indore", "Bhopal", "Visakhapatnam",
  "Patna", "Vadodara", "Surat", "Coimbatore", "Mysore", "Chandigarh",
  "Bhubaneswar", "Guwahati", "Ranchi", "Raipur", "Thiruvananthapuram", "Kochi",
  "Mangalore", "Nashik", "Aurangabad", "Jodhpur", "Udaipur", "Varanasi",
  "Agra", "Kanpur", "Amritsar", "Ludhiana", "Madurai", "Gurgaon", "Noida",
  "Remote"
].sort();

const FILTERS = {
  categories: [
    { name: "Software", icon: "💻" },
    { name: "Marketing", icon: "📈" },
    { name: "HR", icon: "🤝" },
    { name: "Design", icon: "🎨" },
    { name: "Finance", icon: "💰" },
    { name: "Data", icon: "📊" },
    { name: "Sales", icon: "🤝" },
    { name: "Operations", icon: "⚙️" }
  ],
  modes: [
    { name: "Remote", icon: <Globe size={14} /> },
    { name: "On-site", icon: <Building2 size={14} /> },
    { name: "Hybrid", icon: <Laptop size={14} /> }
  ],
  types: ["Paid", "Unpaid"]
};

function FilterSidebarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove existing filter if clicking the same value
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.push(`/internships?${params.toString()}`);
  }, [router, searchParams]);

  const clearAllFilters = useCallback(() => {
    router.push("/internships");
  }, [router]);

  const isActive = useCallback((key: string, value: string) => {
    return searchParams.get(key) === value;
  }, [searchParams]);

  const activeLocation = searchParams.get("location");
  
  const filteredLocations = useMemo(() => {
    return INDIAN_LOCATIONS.filter(loc => 
      loc.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locationSearch]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-20">
      
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-blue-600" />
            <span className="font-semibold text-gray-900">Filters</span>
          </div>
          {searchParams.toString() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <RotateCcw size={12} />
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-5">
        
        {/* Category Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Category</h4>
          <div className="space-y-1">
            {FILTERS.categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => updateFilter("category", cat.name)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive("category", cat.name)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                type="button"
              >
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                {isActive("category", cat.name) && <Check size={14} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Work Mode Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Work Mode</h4>
          <div className="space-y-1">
            {FILTERS.modes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => updateFilter("mode", mode.name)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive("mode", mode.name)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                type="button"
              >
                <div className="flex items-center gap-2">
                  {mode.icon}
                  <span>{mode.name}</span>
                </div>
                {isActive("mode", mode.name) && <Check size={14} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Location</h4>
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded border text-sm ${
                activeLocation && activeLocation !== "All Locations"
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              type="button"
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="truncate">{activeLocation || "All Locations"}</span>
              </div>
              <ChevronRight size={14} className={`transition-transform ${locationOpen ? "rotate-90" : ""}`} />
            </button>

            {locationOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLocationOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        updateFilter("location", "All Locations");
                        setLocationOpen(false);
                        setLocationSearch("");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                      type="button"
                    >
                      <MapPin size={14} />
                      All Locations
                    </button>
                    {filteredLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          updateFilter("location", location);
                          setLocationOpen(false);
                          setLocationSearch("");
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm ${
                          activeLocation === location
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        type="button"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{location}</span>
                        </div>
                        {activeLocation === location && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {INDIAN_LOCATIONS.length} cities
          </div>
        </div>

        {/* Stipend Type */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Stipend</h4>
          <div className="flex gap-2">
            {FILTERS.types.map((type) => (
              <button
                key={type}
                onClick={() => updateFilter("type", type)}
                className={`flex-1 py-1.5 rounded border text-xs font-medium transition-colors ${
                  isActive("type", type)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap with Suspense to handle useSearchParams
export default function FilterSidebar() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <FilterSidebarContent />
    </Suspense>
  );
}