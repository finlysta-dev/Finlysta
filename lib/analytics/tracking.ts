import { isInternalTraffic, getAnalyticsVisitorId } from './internal-traffic';

// Enable debug mode
const DEBUG = true;

function log(message: string, data?: any) {
  if (DEBUG) {
    console.log(`🔍 [Analytics] ${message}`, data || '');
  }
}

export async function trackPageView(path: string) {
  log(`📄 Page view: ${path}`);
  
  if (isInternalTraffic()) {
    log('⛔ Internal traffic - skipping page view tracking');
    return;
  }
  
  try {
    const visitorId = getAnalyticsVisitorId();
    if (!visitorId) {
      log('❌ No visitor ID found');
      return;
    }
    
    log(`👤 Visitor ID: ${visitorId}`);
    log('📤 Sending page view to API...');
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageView',
        visitorId,
        path,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      log(`❌ API Error (${response.status}):`, errorText);
      console.error('Failed to track page view:', errorText);
    } else {
      const result = await response.json();
      log('✅ Page view tracked successfully!', result);
    }
  } catch (error) {
    log('❌ Failed to track page view:', error);
    console.error('Failed to track page view:', error);
  }
}

export async function trackJobView(opportunityId: string) {
  log(`👁️ Job view for opportunity: ${opportunityId}`);
  
  if (isInternalTraffic()) {
    log('⛔ Internal traffic - skipping job view tracking');
    return;
  }
  
  try {
    const visitorId = getAnalyticsVisitorId();
    if (!visitorId) {
      log('❌ No visitor ID found');
      return;
    }
    
    log(`👤 Visitor ID: ${visitorId}`);
    log('📤 Sending opportunity view to API...');
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'opportunityView',
        visitorId,
        opportunityId,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      log(`❌ API Error (${response.status}):`, errorText);
      console.error('Failed to track opportunity view:', errorText);
    } else {
      const result = await response.json();
      log('✅ Opportunity view tracked successfully!', result);
    }
  } catch (error) {
    log('❌ Failed to track opportunity view:', error);
    console.error('Failed to track opportunity view:', error);
  }
}

export async function trackApplyClick(opportunityId: string) {
  log(`🖱️ Apply click for opportunity: ${opportunityId}`);
  
  if (isInternalTraffic()) {
    log('⛔ Internal traffic - skipping apply click tracking');
    return;
  }
  
  try {
    const visitorId = getAnalyticsVisitorId();
    if (!visitorId) {
      log('❌ No visitor ID found');
      return;
    }
    
    log(`👤 Visitor ID: ${visitorId}`);
    log('📤 Sending apply click to API...');
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'opportunityClick',
        visitorId,
        opportunityId,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      log(`❌ API Error (${response.status}):`, errorText);
      console.error('Failed to track apply click:', errorText);
    } else {
      const result = await response.json();
      log('✅ Apply click tracked successfully!', result);
    }
  } catch (error) {
    log('❌ Failed to track apply click:', error);
    console.error('Failed to track apply click:', error);
  }
}