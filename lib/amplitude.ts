// lib/amplitude.ts
'use client';

import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export const initAmplitude = (): void => {
  if (typeof window === 'undefined') return;
  
  if (!AMPLITUDE_API_KEY) {
    console.warn('⚠️ Amplitude API key is missing. Add NEXT_PUBLIC_AMPLITUDE_API_KEY to .env.local');
    return;
  }

  try {
    // Initialize Amplitude with minimal, working configuration
    amplitude.init(AMPLITUDE_API_KEY, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
      },
    });

    console.log('✅ Amplitude initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Amplitude:', error);
  }
};

export const trackEvent = (eventName: string, eventProperties: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [Amplitude Dev] Event: ${eventName}`, eventProperties);
  }

  if (AMPLITUDE_API_KEY) {
    try {
      amplitude.track(eventName, eventProperties);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
};

export const trackPageView = (pageName: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('Page Viewed', {
    page: pageName,
    url: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    timestamp: new Date().toISOString(),
    ...additionalProps
  });
};

export const identifyUser = (userId: string, userProperties: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;
  
  if (userId) {
    try {
      amplitude.setUserId(userId);
      
      if (Object.keys(userProperties).length > 0) {
        const identifyObj = new amplitude.Identify();
        
        Object.entries(userProperties).forEach(([key, value]) => {
          identifyObj.set(key, value);
        });
        
        amplitude.identify(identifyObj);
      }
      
      console.log(`👤 User identified: ${userId}`);
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  }
};

export const clearUser = (): void => {
  if (typeof window === 'undefined') return;
  try {
    amplitude.setUserId(null);
    console.log('👤 User cleared');
  } catch (error) {
    console.error('Failed to clear user:', error);
  }
};

export const setUserProperties = (properties: Record<string, any>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const identifyObj = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identifyObj.set(key, value);
    });
    amplitude.identify(identifyObj);
  } catch (error) {
    console.error('Failed to set user properties:', error);
  }
};

export const trackError = (error: Error, context: Record<string, any> = {}): void => {
  trackEvent('Error Occurred', {
    errorMessage: error?.message || 'Unknown error',
    errorStack: error?.stack || '',
    errorType: error?.name || 'unknown',
    ...context
  });
};

export default {
  initAmplitude,
  trackEvent,
  trackPageView,
  identifyUser,
  clearUser,
  setUserProperties,
  trackError,
};