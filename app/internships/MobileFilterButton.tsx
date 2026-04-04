"use client";

import { Filter } from "lucide-react";

export default function MobileFilterButton() {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.lg\\:w-80');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  };

  return (
    <button 
      onClick={toggleSidebar}
      className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
      type="button"
    >
      <Filter size={14} />
      Filters
    </button>
  );
}