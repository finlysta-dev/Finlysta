export function setInternalTrafficCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = "finlysta_internal=true; path=/; max-age=31536000; SameSite=Lax";
  console.log('🔒 Internal traffic mode ENABLED - Your visits will NOT be tracked');
}

export function removeInternalTrafficCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = "finlysta_internal=; path=/; max-age=0; SameSite=Lax";
  console.log('🔓 Internal traffic mode DISABLED - Your visits WILL be tracked');
}

export function isInternalTraffic(): boolean {
  if (typeof document === 'undefined') return false;
  
  // Check environment variable first (for local testing)
  if (process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "true") {
    console.log('⛔ Analytics disabled via environment variable');
    return true;
  }
  
  const isInternal = document.cookie.includes("finlysta_internal=true");
  if (isInternal) {
    console.log('🔒 Internal traffic mode ON');
  }
  return isInternal;
}

export function getAnalyticsVisitorId(): string {
  if (typeof window === 'undefined') return '';
  
  let visitorId = localStorage.getItem('finlysta_analytics_visitor_id');
  if (!visitorId) {
    // Generate a unique visitor ID
    if (crypto.randomUUID) {
      visitorId = crypto.randomUUID();
    } else {
      visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    localStorage.setItem('finlysta_analytics_visitor_id', visitorId);
    console.log('🆕 New visitor ID generated:', visitorId);
  }
  return visitorId;
}