'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useBlogTracking(blogSlug: string) {
  const startTime = useRef(Date.now());
  const tracked = useRef(false);

  // Generate or get session ID
  const getSessionId = () => {
    if (typeof window === 'undefined') return '';
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
  };

  // Track blog view
  const trackView = useCallback(async () => {
    if (tracked.current) return;
    tracked.current = true;

    try {
      await fetch('/api/analytics/blog-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          sessionId: getSessionId(),
        }),
      });
    } catch (error) {
      console.error('Failed to track blog view:', error);
    }
  }, [blogSlug]);

  // Track blog click
  const trackClick = useCallback(async (targetUrl: string, linkText?: string, linkType?: string) => {
    try {
      await fetch('/api/analytics/blog-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          sessionId: getSessionId(),
          targetUrl,
          linkText,
          linkType,
        }),
      });
    } catch (error) {
      console.error('Failed to track blog click:', error);
    }
  }, [blogSlug]);

  // Track view on mount
  useEffect(() => {
    trackView();

    // Track read time on unmount
    return () => {
      const readTime = Math.round((Date.now() - startTime.current) / 1000);
      
      // Send read time update
      fetch('/api/analytics/blog-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          sessionId: getSessionId(),
          readTime,
        }),
      }).catch(console.error);
    };
  }, [trackView, blogSlug]);

  return { trackClick };
}
