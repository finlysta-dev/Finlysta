"use client";

import { useEffect, useRef } from 'react';

export function useTrackView(opportunityId: string | undefined, type: 'job' | 'internship') {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!opportunityId || hasTracked.current) return;

    const trackView = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_session_id', sessionId);
        }

        await fetch(`/api/opportunities/${opportunityId}/view`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        
        hasTracked.current = true;
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    // Track after a short delay to ensure page is loaded
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [opportunityId]);
}
