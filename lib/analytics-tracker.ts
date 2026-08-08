// ===== FINLYSTA ANALYTICS TRACKER =====
// Tracks anonymous user behavior across the entire website

class FinlystaAnalytics {
  private sessionId: string = '';
  private pageEnterTime: number = 0;
  private eventsQueue: any[] = [];
  private maxScrollDepth: number = 0;
  private totalClicks: number = 0;
  private pagesViewed: string[] = [];
  private sectionsViewed: Set<string> = new Set();
  private flushInterval: any = null;
  private isTracking: boolean = false;

  constructor() {
    if (typeof window === 'undefined') return;
    
    this.sessionId = this.getOrCreateSessionId();
    this.pageEnterTime = Date.now();
    this.isTracking = true;
    
    this.trackPageView();
    this.trackDeviceInfo();
    this.trackTrafficSource();
    this.trackScreenSize();
    this.trackScrollDepth();
    this.startFlushInterval();
    this.trackReturningVisitor();
    this.trackTimeOnPage();
  }

  // ===== SESSION MANAGEMENT =====
  private getOrCreateSessionId(): string {
    let id = localStorage.getItem('finlysta_sid');
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('finlysta_sid', id);
    }
    return id;
  }

  private trackReturningVisitor(): void {
    const visitCount = parseInt(localStorage.getItem('finlysta_visits') || '0');
    localStorage.setItem('finlysta_visits', (visitCount + 1).toString());
    
    this.track('visitor_type', {
      visitCount: visitCount + 1,
      isReturning: visitCount > 0,
      firstVisit: localStorage.getItem('finlysta_first_visit') || new Date().toISOString(),
    });
    
    if (visitCount === 0) {
      localStorage.setItem('finlysta_first_visit', new Date().toISOString());
    }
  }

  // ===== FLUSH EVENTS =====
  private startFlushInterval(): void {
    this.flushInterval = setInterval(() => this.flush(), 5000);
  }

  private async flush(): Promise<void> {
    if (this.eventsQueue.length === 0) return;
    const events = [...this.eventsQueue];
    this.eventsQueue = [];
    
    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events, sessionId: this.sessionId }),
      });
    } catch (error) {
      this.eventsQueue = [...events, ...this.eventsQueue];
    }
  }

  // ===== PRIORITY 1: TRAFFIC & VISITOR =====
  track(event: string, data?: Record<string, any>): void {
    if (!this.isTracking) return;
    
    this.eventsQueue.push({
      event,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data: data || {},
    });

    // Flush immediately for critical events
    if (['page_view', 'page_exit', 'search', 'apply_click', 'quiz_complete'].includes(event)) {
      this.flush();
    }
  }

  trackPageView(): void {
    const page = window.location.pathname;
    this.pagesViewed.push(page);
    
    this.track('page_view', {
      url: page,
      referrer: document.referrer,
      title: document.title,
      pageType: this.getPageType(page),
    });
    
    // Also track via Visitor API
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        page,
        referrer: document.referrer,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
      }),
    }).catch(() => {});
  }

  trackDeviceInfo(): void {
    const ua = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone/i.test(ua);
    const isTablet = /iPad|Tablet/i.test(ua);
    const device = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
    
    let browser = 'Other';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    
    let os = 'Other';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac OS|Macintosh/i.test(ua)) os = 'macOS';
    else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Linux/i.test(ua)) os = 'Linux';

    this.track('device_info', { device, browser, os });
  }

  trackTrafficSource(): void {
    const referrer = document.referrer || '';
    let source = 'Direct';
    let medium = 'none';
    
    if (!referrer) {
      source = 'Direct';
    } else if (referrer.includes('google.')) {
      source = 'Google';
      medium = referrer.includes('ad') ? 'cpc' : 'organic';
    } else if (referrer.includes('linkedin.com')) {
      source = 'LinkedIn';
      medium = 'social';
    } else if (referrer.includes('facebook.com')) {
      source = 'Facebook';
      medium = 'social';
    } else if (referrer.includes('instagram.com')) {
      source = 'Instagram';
      medium = 'social';
    } else if (referrer.includes('whatsapp')) {
      source = 'WhatsApp';
      medium = 'social';
    } else if (referrer.includes('twitter.com') || referrer.includes('x.com')) {
      source = 'Twitter';
      medium = 'social';
    } else if (referrer.includes('finlysta.com')) {
      source = 'Internal';
      medium = 'internal';
    } else {
      source = 'Other';
      medium = 'referral';
    }

    this.track('traffic_source', { source, medium, referrer });
  }

  trackScreenSize(): void {
    this.track('screen_size', {
      width: window.screen.width,
      height: window.screen.height,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio,
    });
  }

  // ===== PRIORITY 2: PAGE ANALYTICS =====
  trackScrollDepth(): void {
    let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.round((scrollTop / docHeight) * 100);
      
      if (percent > this.maxScrollDepth) this.maxScrollDepth = percent;
      
      if (percent >= 25 && !tracked25) { tracked25 = true; this.track('scroll_25', { page: window.location.pathname }); }
      if (percent >= 50 && !tracked50) { tracked50 = true; this.track('scroll_50', { page: window.location.pathname }); }
      if (percent >= 75 && !tracked75) { tracked75 = true; this.track('scroll_75', { page: window.location.pathname }); }
      if (percent >= 95 && !tracked100) { tracked100 = true; this.track('scroll_100', { page: window.location.pathname }); }
    }, { passive: true });
  }

  trackTimeOnPage(): void {
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.pageEnterTime) / 1000);
      this.track('time_on_page', {
        page: window.location.pathname,
        seconds: timeSpent,
        scrollDepth: this.maxScrollDepth,
        clicks: this.totalClicks,
      });
    });
  }

  // ===== PRIORITY 3: SEARCH ANALYTICS =====
  trackSearch(query: string, resultsCount: number): void {
    this.track('search', {
      query: query.toLowerCase().trim(),
      resultsCount,
      hasResults: resultsCount > 0,
      page: window.location.pathname,
    });
  }

  trackSearchClick(query: string, clickedPosition: number, clickedUrl: string): void {
    this.track('search_click', {
      query: query.toLowerCase().trim(),
      position: clickedPosition,
      url: clickedUrl,
    });
  }

  // ===== PRIORITY 4: INTERVIEW PREP ANALYTICS =====
  trackInterviewTopic(topic: string): void {
    this.track('interview_topic_open', { topic });
  }

  trackFlashcard(topic: string, cardIndex: number): void {
    this.track('flashcard_view', { topic, cardIndex });
  }

  trackQuizStart(topic: string, totalQuestions: number): void {
    this.track('quiz_start', { topic, totalQuestions });
  }

  trackQuizComplete(topic: string, score: number, totalQuestions: number): void {
    this.track('quiz_complete', {
      topic,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
    });
  }

  trackPDFDownload(topic: string): void {
    this.track('pdf_download', { topic });
  }

  trackMockInterviewStart(topic: string): void {
    this.track('mock_interview_start', { topic });
  }

  // ===== PRIORITY 5: JOB & INTERNSHIP ANALYTICS =====
  trackJobView(jobId: string, title: string, company: string, type: string): void {
    this.track('job_view', { jobId, title, company, type });
  }

  trackApplyClick(jobId: string, title: string, company: string, source: string): void {
    this.track('apply_click', { jobId, title, company, source });
    
    // Also track via dedicated API
    fetch('/api/analytics/opportunity-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunityId: jobId, sessionId: this.sessionId }),
    }).catch(() => {});
  }

  trackBookmarkClick(jobId: string, title: string): void {
    this.track('bookmark_click', { jobId, title });
  }

  trackFilterUsage(filterType: string, filterValue: string): void {
    this.track('filter_use', { filterType, filterValue });
  }

  // ===== PRIORITY 6: BEHAVIOR ANALYTICS =====
  trackClick(element: string, data?: Record<string, any>): void {
    this.totalClicks++;
    this.track('click', {
      element,
      text: data?.text || '',
      url: data?.url || '',
      position: data?.position || {},
      totalClicks: this.totalClicks,
    });
  }

  trackRageClick(element: string): void {
    this.track('rage_click', { element, timeSinceLastClick: Date.now() });
  }

  trackNavigation(from: string, to: string): void {
    this.track('navigation', { from, to, path: [...this.pagesViewed, to] });
  }

  // ===== PRIORITY 7: CONTENT ANALYTICS =====
  trackBlogView(blogSlug: string, blogTitle: string, category: string): void {
    this.track('blog_view', { blogSlug, blogTitle, category });
    
    fetch('/api/analytics/blog-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogSlug, sessionId: this.sessionId }),
    }).catch(() => {});
  }

  trackBlogReadComplete(blogSlug: string, readTimeSeconds: number): void {
    this.track('blog_read_complete', { blogSlug, readTimeSeconds });
  }

  trackBlogShare(blogSlug: string, platform: string): void {
    this.track('blog_share', { blogSlug, platform });
  }

  // ===== PRIORITY 8: FEATURE DISCOVERY =====
  trackFeatureUse(feature: string, data?: Record<string, any>): void {
    this.track('feature_use', { feature, ...data });
  }

  trackTrendingTopic(topic: string, views: number): void {
    this.track('trending_topic', { topic, views });
  }

  // ===== PRIORITY 9: TECHNICAL ANALYTICS =====
  trackPageLoadTime(loadTimeMs: number): void {
    const rating = loadTimeMs < 1000 ? 'good' : loadTimeMs < 3000 ? 'needs_improvement' : 'poor';
    this.track('page_load_time', { loadTimeMs, rating, page: window.location.pathname });
  }

  trackAPIError(endpoint: string, statusCode: number, errorMessage: string): void {
    this.track('api_error', { endpoint, statusCode, errorMessage });
  }

  trackImageError(imageUrl: string): void {
    this.track('image_error', { imageUrl, page: window.location.pathname });
  }

  trackJSError(message: string, source: string, lineno: number): void {
    this.track('js_error', { message, source, lineno });
  }

  // ===== UTILITY =====
  private getPageType(path: string): string {
    if (path === '/') return 'homepage';
    if (path.includes('/interview-prep')) return 'interview';
    if (path.includes('/internships')) return 'internships';
    if (path.includes('/jobs')) return 'jobs';
    if (path.includes('/blogs')) return 'blog';
    if (path.includes('/learning-hub')) return 'learn';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/admin')) return 'admin';
    return 'other';
  }

  getSessionId(): string { return this.sessionId; }
  getPagesViewed(): string[] { return this.pagesViewed; }
  getScrollDepth(): number { return this.maxScrollDepth; }

  destroy(): void {
    const timeSpent = Math.round((Date.now() - this.pageEnterTime) / 1000);
    this.track('session_end', {
      timeSpent,
      pagesViewed: this.pagesViewed.length,
      scrollDepth: this.maxScrollDepth,
      totalClicks: this.totalClicks,
      path: this.pagesViewed,
    });
    this.flush();
    if (this.flushInterval) clearInterval(this.flushInterval);
    this.isTracking = false;
  }
}

// ===== SINGLETON =====
let analyticsInstance: FinlystaAnalytics | null = null;

export function getAnalytics(): FinlystaAnalytics {
  if (typeof window === 'undefined') {
    return new Proxy({} as FinlystaAnalytics, {
      get: () => () => {},
    });
  }
  
  if (!analyticsInstance) {
    analyticsInstance = new FinlystaAnalytics();
  }
  return analyticsInstance;
}

export function initAnalytics(): FinlystaAnalytics {
  return getAnalytics();
}

export default FinlystaAnalytics;