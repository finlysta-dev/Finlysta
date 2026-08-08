// hooks/useTracking.ts
'use client';

import { trackEvent, identifyUser, trackError, clearUser } from '@/lib/amplitude';
import { useCallback } from 'react';

interface UserData {
  id: string;
  email?: string;
  plan?: string;
  method?: string;
  referralCode?: string;
}

interface InvestmentData {
  amount: number;
  assetType: string;
  duration: string;
  riskLevel: string;
  isRecurring?: boolean;
}

interface TransactionData {
  type: string;
  amount: number;
  fee?: number;
  status: string;
  method: string;
}

interface PortfolioData {
  totalValue: number;
  assetCount: number;
  lastUpdated?: string;
}

export const useTracking = () => {
  const track = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    trackEvent(eventName, properties);
  }, []);

  const trackUserSignUp = useCallback((userData: UserData) => {
    identifyUser(userData.id, {
      email: userData.email,
      plan: userData.plan || 'free',
      signUpDate: new Date().toISOString().split('T')[0],
    });
    
    trackEvent('User Signed Up', {
      method: userData.method || 'email',
      plan: userData.plan || 'free',
      referralCode: userData.referralCode || null,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackUserLogin = useCallback((userData: UserData) => {
    identifyUser(userData.id, {
      email: userData.email,
      plan: userData.plan,
      lastLogin: new Date().toISOString(),
    });
    
    trackEvent('User Logged In', {
      method: userData.method || 'email',
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackUserLogout = useCallback(() => {
    trackEvent('User Logged Out', {
      timestamp: new Date().toISOString(),
    });
    clearUser();
  }, []);

  const trackInvestment = useCallback((investmentData: InvestmentData) => {
    trackEvent('Investment Created', {
      amount: investmentData.amount,
      assetType: investmentData.assetType,
      duration: investmentData.duration,
      riskLevel: investmentData.riskLevel,
      isRecurring: investmentData.isRecurring || false,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackTransaction = useCallback((transactionData: TransactionData) => {
    trackEvent('Transaction Completed', {
      type: transactionData.type,
      amount: transactionData.amount,
      fee: transactionData.fee || 0,
      status: transactionData.status,
      method: transactionData.method,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackPortfolioView = useCallback((portfolioData: PortfolioData) => {
    trackEvent('Portfolio Viewed', {
      totalValue: portfolioData.totalValue,
      assetCount: portfolioData.assetCount,
      lastUpdated: portfolioData.lastUpdated || new Date().toISOString(),
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackJobView = useCallback((jobData: { jobId: string; title: string; company: string; location?: string }) => {
    trackEvent('Job Viewed', {
      jobId: jobData.jobId,
      jobTitle: jobData.title,
      company: jobData.company,
      location: jobData.location || 'Remote',
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackJobApply = useCallback((jobData: { jobId: string; title: string; company: string; applicationMethod: string }) => {
    trackEvent('Job Applied', {
      jobId: jobData.jobId,
      jobTitle: jobData.title,
      company: jobData.company,
      applicationMethod: jobData.applicationMethod,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackInternshipView = useCallback((internshipData: { internshipId: string; title: string; company: string; type?: string }) => {
    trackEvent('Internship Viewed', {
      internshipId: internshipData.internshipId,
      internshipTitle: internshipData.title,
      company: internshipData.company,
      type: internshipData.type || 'General',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return {
    track,
    trackUserSignUp,
    trackUserLogin,
    trackUserLogout,
    trackInvestment,
    trackTransaction,
    trackPortfolioView,
    trackJobView,
    trackJobApply,
    trackInternshipView,
    trackError,
  };
};

export default useTracking;