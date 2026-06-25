'use client';

import { useState, useEffect } from 'react';
import { isInternalTraffic } from '@/lib/analytics/internal-traffic';

export default function DebugAnalytics() {
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    setIsInternal(isInternalTraffic());
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analytics Debug</h1>
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="font-medium">Internal Traffic Mode:</p>
        <p className={isInternal ? 'text-green-600' : 'text-red-600'}>
          {isInternal ? '✅ ON - Your visits are NOT tracked' : '❌ OFF - Your visits ARE tracked'}
        </p>
      </div>
      <div className="mt-4 bg-blue-50 rounded-lg p-4 text-sm">
        <p>💡 Tips:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Visit <code className="bg-gray-200 px-1 rounded">/internal</code> to enable internal mode</li>
          <li>Visit <code className="bg-gray-200 px-1 rounded">/settings/internal-traffic</code> to toggle</li>
          <li>Set <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_DISABLE_ANALYTICS=true</code> in .env.local</li>
        </ul>
      </div>
    </div>
  );
}