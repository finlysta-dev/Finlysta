'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_session_id', sessionId);
        }
        
        // Track page view
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            page: pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        });
        
        // Track opportunity view if on opportunity page
        // Check for /opportunities/[slug] or /jobs/[slug] pattern
        const opportunityMatch = pathname?.match(/\/(opportunities|jobs)\/([^\/]+)/);
        if (opportunityMatch) {
          const slug = opportunityMatch[2];
          await fetch('/api/analytics/opportunity-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              slug,
              sessionId,
            }),
          });
        }
        
        // Track blog view if on blog page
        const blogMatch = pathname?.match(/\/blog\/([^\/]+)/);
        if (blogMatch) {
          const blogSlug = blogMatch[1];
          await fetch('/api/analytics/blog-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              blogSlug,
              sessionId,
              pageUrl: pathname,
            }),
          });
        }
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };
    
    trackVisit();
  }, [pathname]);
  
  return null;
}