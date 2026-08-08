'use client';

import { useEffect, useRef } from 'react';
import { initAnalytics, getAnalytics } from '@/lib/analytics-tracker';
import { usePathname } from 'next/navigation';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const analyticsRef = useRef<any>(null);
  const prevPathRef = useRef<string>('');

  // Initialize analytics
  useEffect(() => {
    analyticsRef.current = initAnalytics();
    
    // Track page load time
    if (window.performance) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        analyticsRef.current.trackPageLoadTime(Math.round(loadTime));
      }
    }

    // Track JS errors
    const errorHandler = (event: ErrorEvent) => {
      analyticsRef.current.trackJSError(
        event.message,
        event.filename,
        event.lineno
      );
    };
    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      if (analyticsRef.current) {
        analyticsRef.current.destroy();
      }
    };
  }, []);

  // Track page navigation
  useEffect(() => {
    if (prevPathRef.current && analyticsRef.current) {
      analyticsRef.current.trackNavigation(prevPathRef.current, pathname);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}
