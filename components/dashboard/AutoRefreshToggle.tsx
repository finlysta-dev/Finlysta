'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface AutoRefreshToggleProps {
  onRefresh: () => void;
}

export default function AutoRefreshToggle({ onRefresh }: AutoRefreshToggleProps) {
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoRefresh) {
      const id = setInterval(() => {
        onRefresh();
      }, 30000); // Refresh every 30 seconds
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRefresh, onRefresh]);

  return (
    <button
      onClick={() => setIsAutoRefresh(!isAutoRefresh)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isAutoRefresh 
          ? 'bg-green-100 text-green-700 border border-green-300' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <RefreshCw size={16} className={isAutoRefresh ? 'animate-spin' : ''} />
      {isAutoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
    </button>
  );
}