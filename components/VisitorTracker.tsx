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

        // Get IP address (using free API)
        let ipAddress = '127.0.0.1';
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (error) {
          console.log('Using local IP');
        }

        // Send tracking data to your API
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            sessionId: sessionId,
            ipAddress: ipAddress,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
