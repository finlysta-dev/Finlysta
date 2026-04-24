"use client";

import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface CompanyLogoProps {
  companyName: string;
  logoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CompanyLogo({ 
  companyName, 
  logoUrl, 
  size = 'md',
  className = '' 
}: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-2xl'
  };

  const imageSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  // If no logo URL or error, show fallback with company initial
  if (!logoUrl || hasError) {
    return (
      <div className={`rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}>
        <span className={`font-bold text-indigo-600 ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-base'}`}>
          {companyName?.charAt(0).toUpperCase() || 'C'}
        </span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden ${sizeClasses[size]} ${className}`}>
      <img
        src={logoUrl}
        alt={companyName}
        className={`object-contain ${imageSizes[size]}`}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
