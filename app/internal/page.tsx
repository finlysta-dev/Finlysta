import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setInternalTrafficCookie } from '@/lib/analytics/internal-traffic';

export default function InternalPage() {
  const router = useRouter();

  useEffect(() => {
    setInternalTrafficCookie();
    router.push('/settings/internal-traffic');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h1 className="text-2xl font-bold mt-4">Internal Traffic Mode Enabled</h1>
        <p className="text-gray-600 mt-2">Redirecting to settings...</p>
      </div>
    </div>
  );
}