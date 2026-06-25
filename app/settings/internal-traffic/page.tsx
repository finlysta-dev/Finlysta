import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

'use client';

import { useState, useEffect } from 'react';
import { setInternalTrafficCookie, removeInternalTrafficCookie, isInternalTraffic } from '@/lib/analytics/internal-traffic';
import { Shield, ShieldOff } from 'lucide-react';

export default function InternalTrafficSettings() {
  const [isInternal, setIsInternal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsInternal(isInternalTraffic());
    setIsLoading(false);
  }, []);

  const handleEnable = () => {
    setInternalTrafficCookie();
    setIsInternal(true);
  };

  const handleDisable = () => {
    removeInternalTrafficCookie();
    setIsInternal(false);
  };

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Internal Traffic Settings</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            {isInternal ? (
              <Shield className="h-5 w-5 text-green-600" />
            ) : (
              <ShieldOff className="h-5 w-5 text-gray-600" />
            )}
            <h2 className="text-xl font-semibold">Internal Traffic Mode</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Enable this mode to prevent your own visits from being tracked in analytics.
            This is useful for admins who don't want to skew the data.
          </p>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Current Status:</p>
              <p className={isInternal ? 'text-green-600' : 'text-gray-600'}>
                {isInternal ? '✅ Internal traffic mode is ON' : '❌ Internal traffic mode is OFF'}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {isInternal ? 'Your visits are not being tracked' : 'Your visits are being tracked'}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-4">
            {!isInternal ? (
              <button
                onClick={handleEnable}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Enable Internal Traffic Mode
              </button>
            ) : (
              <button
                onClick={handleDisable}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Disable Internal Traffic Mode
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="font-medium mb-2">How it works:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li>A cookie named <code className="bg-gray-100 px-1 rounded">finlysta_internal</code> is stored in your browser</li>
          <li>All analytics tracking checks for this cookie before recording events</li>
          <li>When enabled, your page views, job views, and apply clicks won't be recorded</li>
          <li>This cookie expires after 1 year</li>
        </ul>
      </div>
    </div>
  );
}