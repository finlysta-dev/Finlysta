"use client";

import { useState } from 'react';

interface AvatarProps {
  user?: {
    image?: string | null;
    name?: string | null;
    email?: string | null;
  };
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function Avatar({ user, size = 32, className = '', onClick }: AvatarProps) {
  const [error, setError] = useState(false);
  
  const name = user?.name || user?.email?.split('@')[0] || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  // If user has an uploaded image and no error, show the image
  if (user?.image && !error) {
    return (
      <div 
        onClick={onClick}
        className={`rounded-full overflow-hidden flex-shrink-0 bg-gray-200 cursor-pointer ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={user.image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      </div>
    );
  }
  
  // Fallback: show initials with gradient background
  return (
    <div 
      onClick={onClick}
      className={`rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
