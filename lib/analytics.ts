// Client-side analytics utility (runs in browser)

export function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export function getOrCreateSession(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
}

export async function trackPageView(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const sessionId = getOrCreateSession();
  
  try {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        page: window.location.pathname,
        referrer: document.referrer,
        screenSize: window.screen.width + 'x' + window.screen.height,
        language: navigator.language,
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function trackFeedback(feedback: {
  name: string;
  rating: number;
  comment: string;
  page?: string;
}): Promise<void> {
  try {
    await fetch('/api/analytics/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: feedback.name,
        rating: feedback.rating,
        comment: feedback.comment,
        page: feedback.page || window.location.pathname,
        sessionId: getOrCreateSession(),
      }),
    });
  } catch (error) {
    console.error('Failed to submit feedback:', error);
  }
}

export function trackTimeOnPage(): () => void {
  const startTime = Date.now();
  const pageViewId = 'pv_' + startTime;

  return () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    localStorage.setItem('time_' + pageViewId, timeOnPage.toString());
  };
}
