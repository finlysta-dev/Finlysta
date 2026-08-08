// app/templates/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Building2,
  Copy,
  Check,
  Clock,
  CheckCircle,
  BarChart3,
  Download,
  FileText,
  Send,
  Linkedin,
  Edit3,
  RefreshCw,
  Brain,
  Users,
  ListChecks,
  AlertTriangle,
  Square,
  Smartphone,
  Monitor,
  BookOpen,
  TrendingUp,
  Phone,
  MessageCircle,
  Briefcase as BriefcaseIcon,
  FileCheck,
  Type,
} from 'lucide-react';
import Link from 'next/link';

// Sample student data
const STUDENT_DATA = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 98765 0000",
  linkedin: "https://linkedin.com/in/priyasharma",
  jobTitle: "Financial Analyst",
  companyName: "Finlysta",
  recruiterName: "Amit Patel",
  applicationDate: "January 15, 2024"
};

// Template definitions
const TEMPLATE_DATA = {
  'post-application': {
    id: 'post-application',
    title: 'Post-Application Thank You',
    icon: '📝',
    description: 'Make a strong first impression right after submitting your application',
    category: 'After Application',
    badge: 'Most Common',
    badgeColor: 'bg-blue-100 text-blue-700',
    whenToUse: [
      'Immediately after submitting your application (within 24 hours)',
      'When you want to stand out from other applicants',
      'To show genuine interest in the role and company',
      'When you have a strong connection to the company\'s mission'
    ],
    benefits: [
      'Shows professionalism and attention to detail',
      'Keeps you top of mind with the recruiter',
      'Demonstrates strong communication skills',
      'Builds a positive impression before the interview'
    ],
    commonMistakes: [
      { mistake: '❌ "Dear Sir/Madam"', fix: '✅ "Dear Amit"' },
      { mistake: '❌ "Please give me job"', fix: '✅ "Thank you for considering my application"' },
      { mistake: '❌ 500-word long email', fix: '✅ Keep under 150 words' },
      { mistake: '❌ Generic copy-paste template', fix: '✅ Personalize with company details' }
    ],
    subject: `Thank You for Considering My Application - ${STUDENT_DATA.name} - ${STUDENT_DATA.jobTitle}`,
    body: `Dear ${STUDENT_DATA.recruiterName},

I hope this email finds you well.

I recently submitted my application for the ${STUDENT_DATA.jobTitle} position at ${STUDENT_DATA.companyName}, and I wanted to personally thank you for taking the time to review my candidacy.

After researching ${STUDENT_DATA.companyName}'s impact in the finance sector, I'm genuinely excited about the possibility of contributing to your team. My background in financial analysis and passion for investment banking align perfectly with what you're looking for.

To make our connection more meaningful, I've also sent you a LinkedIn connection request. I'd love to stay updated on your team's work and any future opportunities at ${STUDENT_DATA.companyName}.

I've attached my resume for quick reference and would welcome the opportunity to discuss how I can contribute to your team's success.

Thank you for your time and consideration. I look forward to hearing from you.

Warm regards,
${STUDENT_DATA.name}
📱 ${STUDENT_DATA.phone}
📧 ${STUDENT_DATA.email}
🔗 ${STUDENT_DATA.linkedin}`,
    tips: [
      "Always personalize with the recruiter's name",
      "Mention something specific about the company",
      "Send a LinkedIn connection request immediately after",
      "Attach your resume as PDF"
    ],
    linkedinMessage: `Hi ${STUDENT_DATA.recruiterName},

I recently applied for the ${STUDENT_DATA.jobTitle} role at ${STUDENT_DATA.companyName}.

Looking forward to the opportunity.

Thought I'd connect here as well.

Thank you!

${STUDENT_DATA.name}`
  },
  'post-interview': {
    id: 'post-interview',
    title: 'Post-Interview Thank You',
    icon: '🎯',
    description: 'Reinforce your interest and key points from the interview',
    category: 'After Interview',
    badge: 'Essential',
    badgeColor: 'bg-purple-100 text-purple-700',
    whenToUse: [
      'Within 24 hours of any interview (phone, video, or in-person)',
      'When you want to reinforce key points from the conversation',
      'To address any questions you couldn\'t answer fully',
      'To show you were paying attention and are genuinely interested'
    ],
    benefits: [
      'Recruiter remembers you positively from the interview',
      'Shows your professionalism and follow-through',
      'Helps clarify any points that may have been unclear',
      'Often leads to faster decision-making on your candidacy'
    ],
    commonMistakes: [
      { mistake: '❌ Sending generic thank you', fix: '✅ Reference specific discussion points' },
      { mistake: '❌ Waiting too long to send', fix: '✅ Send within 24 hours' },
      { mistake: '❌ Being too casual', fix: '✅ Maintain professional tone' }
    ],
    subject: `Thank You for the Interview Opportunity - ${STUDENT_DATA.name} - ${STUDENT_DATA.jobTitle}`,
    body: `Dear ${STUDENT_DATA.recruiterName},

Thank you so much for taking the time to speak with me today about the ${STUDENT_DATA.jobTitle} position at ${STUDENT_DATA.companyName}.

I truly enjoyed learning more about your team's work, particularly your approach to financial modeling and investment strategies. It was inspiring to hear how ${STUDENT_DATA.companyName} is driving innovation in the finance sector.

Based on our conversation, I'm even more convinced that my experience in financial analysis and my passion for [specific area] would allow me to contribute meaningfully to your team.

I've also sent you a LinkedIn connection request to stay in touch and keep up with your team's great work.

Thank you again for your time and consideration. I look forward to the next steps!

Warm regards,
${STUDENT_DATA.name}
📱 ${STUDENT_DATA.phone}
📧 ${STUDENT_DATA.email}
🔗 ${STUDENT_DATA.linkedin}`,
    tips: [
      "Send within 24 hours of the interview",
      "Reference something specific from your conversation",
      "Reinforce why you're a good fit",
      "Keep it concise and professional"
    ],
    linkedinMessage: `Hi ${STUDENT_DATA.recruiterName},

Thank you for taking the time to interview me today for the ${STUDENT_DATA.jobTitle} role.

I really enjoyed our conversation and learning more about ${STUDENT_DATA.companyName}.

Looking forward to hearing from you!

${STUDENT_DATA.name}`
  },
  'linkedin-connection': {
    id: 'linkedin-connection',
    title: 'LinkedIn Connection Follow-Up',
    icon: '🔗',
    description: 'Build your professional network and stay top-of-mind',
    category: 'Networking',
    badge: 'Strategic',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    whenToUse: [
      'After the recruiter accepts your LinkedIn connection request',
      'When you want to maintain visibility in their network',
      'To start building a professional relationship beyond the application',
      'When you want to stay updated on company news and opportunities'
    ],
    benefits: [
      'Builds a professional relationship beyond the application',
      'Increases your visibility in their network',
      'Creates opportunities for future roles',
      'Shows your proactive approach to networking'
    ],
    commonMistakes: [
      { mistake: '❌ Sending generic connection request', fix: '✅ Personalize your message' },
      { mistake: '❌ Being too salesy', fix: '✅ Focus on genuine interest' }
    ],
    subject: `Great Connecting on LinkedIn! - ${STUDENT_DATA.name} - ${STUDENT_DATA.jobTitle}`,
    body: `Hi ${STUDENT_DATA.recruiterName},

Thank you for accepting my LinkedIn connection request!

I wanted to reach out personally to express my strong interest in the ${STUDENT_DATA.jobTitle} role at ${STUDENT_DATA.companyName}. I've been following your team's work in the finance sector, and I'm genuinely impressed by your approach to [specific area].

As a finance graduate with a passion for financial analysis, I'm excited about the opportunity to bring my skills in [mention 2 key skills] to your team.

I've applied for the position and would welcome the chance to discuss how my background could contribute to ${STUDENT_DATA.companyName}'s continued growth.

Thank you for your time, and I look forward to staying connected!

Best regards,
${STUDENT_DATA.name}
📱 ${STUDENT_DATA.phone}
📧 ${STUDENT_DATA.email}
🔗 ${STUDENT_DATA.linkedin}`,
    tips: [
      "Send immediately after they accept your request",
      "Reference their recent work or achievement",
      "Keep the tone professional but warm",
      "Show genuine interest in the company"
    ],
    linkedinMessage: `Hi ${STUDENT_DATA.recruiterName},

Thanks for connecting! I'm really impressed by ${STUDENT_DATA.companyName}'s work in the finance sector.

I recently applied for the ${STUDENT_DATA.jobTitle} role and would love to learn more about your team.

Looking forward to connecting!

${STUDENT_DATA.name}`
  },
  'follow-up': {
    id: 'follow-up',
    title: 'Follow-Up (No Response)',
    icon: '⏳',
    description: 'Gently remind recruiters about your application after 5-7 days',
    category: 'Follow-Up',
    badge: 'Persistence',
    badgeColor: 'bg-amber-100 text-amber-700',
    whenToUse: [
      '5-7 business days after applying with no response',
      'When you want to demonstrate continued interest',
      'After a phone screen without next steps communicated',
      'When you have new qualifications or achievements to share'
    ],
    benefits: [
      'Shows persistence and genuine interest in the role',
      'May remind recruiter to review your application',
      'Can revive a stalled application process',
      'Demonstrates professional communication skills'
    ],
    commonMistakes: [
      { mistake: '❌ Following up too soon', fix: '✅ Wait 5-7 business days' },
      { mistake: '❌ Being pushy or demanding', fix: '✅ Be polite and professional' }
    ],
    subject: `Following Up on My Application - ${STUDENT_DATA.name} - ${STUDENT_DATA.jobTitle}`,
    body: `Dear ${STUDENT_DATA.recruiterName},

I hope you're having a great week!

I'm writing to follow up on my application for the ${STUDENT_DATA.jobTitle} position at ${STUDENT_DATA.companyName}, which I submitted on ${STUDENT_DATA.applicationDate}.

Since applying, I've been following ${STUDENT_DATA.companyName}'s work in the finance sector and remain very interested in the opportunity to contribute to your team.

If you need any additional information from me—such as my resume, portfolio, or references—please don't hesitate to ask.

Thank you again for your time and consideration. I look forward to hearing from you when you have a moment.

Best regards,
${STUDENT_DATA.name}
📱 ${STUDENT_DATA.phone}
📧 ${STUDENT_DATA.email}
🔗 ${STUDENT_DATA.linkedin}`,
    tips: [
      "Wait 5-7 business days before following up",
      "Be polite and professional, not pushy",
      "Remind them of your qualifications briefly",
      "Offer to provide additional information"
    ],
    linkedinMessage: `Hi ${STUDENT_DATA.recruiterName},

Just following up on my application for the ${STUDENT_DATA.jobTitle} role at ${STUDENT_DATA.companyName}.

I'm still very interested and wanted to check in.

Thank you for your time!

${STUDENT_DATA.name}`
  },
  'offer-received': {
    id: 'offer-received',
    title: 'Thank You After Offer',
    icon: '🎉',
    description: 'Express gratitude and professionalism when you receive an offer',
    category: 'After Offer',
    badge: 'Celebratory',
    badgeColor: 'bg-green-100 text-green-700',
    whenToUse: [
      'Immediately after receiving a job offer',
      'When you want to express genuine enthusiasm',
      'To confirm next steps and timeline',
      'To build rapport before joining the team'
    ],
    benefits: [
      'Shows your professionalism and gratitude',
      'Confirms your enthusiasm for joining the team',
      'Sets a positive tone for your onboarding',
      'Builds a strong relationship with your future manager'
    ],
    commonMistakes: [
      { mistake: '❌ Not responding promptly', fix: '✅ Respond within 24 hours' },
      { mistake: '❌ Being too casual', fix: '✅ Maintain professional tone' }
    ],
    subject: `Thank You for the Offer - ${STUDENT_DATA.name} - ${STUDENT_DATA.jobTitle}`,
    body: `Dear ${STUDENT_DATA.recruiterName},

I'm writing to express my sincere gratitude for offering me the ${STUDENT_DATA.jobTitle} position at ${STUDENT_DATA.companyName}.

This opportunity means a great deal to me, and I'm incredibly excited to join a team known for its excellence in financial analysis and investment banking. I've been thoroughly impressed by ${STUDENT_DATA.companyName}'s culture and the meaningful work your team does.

I've already sent you a LinkedIn connection request to stay connected professionally. I'll be reviewing the offer details and will get back to you soon.

Thank you once again for this incredible opportunity. I can't wait to contribute to the team and help drive ${STUDENT_DATA.companyName}'s continued success!

Warmest regards,
${STUDENT_DATA.name}
📱 ${STUDENT_DATA.phone}
📧 ${STUDENT_DATA.email}
🔗 ${STUDENT_DATA.linkedin}`,
    tips: [
      "Express genuine gratitude",
      "Confirm next steps in the process",
      "Show enthusiasm for joining the company",
      "Be professional and positive"
    ],
    linkedinMessage: `Hi ${STUDENT_DATA.recruiterName},

I'm thrilled to share that I've accepted the ${STUDENT_DATA.jobTitle} offer at ${STUDENT_DATA.companyName}!

Thank you for all your support throughout the process.

Looking forward to joining the team!

${STUDENT_DATA.name}`
  }
};

// Email Quality Score calculation
const calculateEmailQuality = (body: string, subject: string, personalization: any) => {
  let score = 0;
  let details = {
    professionalism: 0,
    personalization: 0,
    conciseness: 0,
    recruiterFriendly: 0,
    responsePotential: 0
  };

  // Professionalism check
  if (body.includes('Dear') || body.includes('Hi')) details.professionalism += 25;
  if (body.includes('Thank you') || body.includes('Thanks')) details.professionalism += 25;
  if (body.includes('regards') || body.includes('sincerely')) details.professionalism += 25;
  if (body.length < 500) details.professionalism += 25;

  // Personalization check
  if (personalization.recruiterName) details.personalization += 25;
  if (personalization.companyName) details.personalization += 25;
  if (personalization.jobTitle) details.personalization += 25;
  if (personalization.skill1) details.personalization += 25;

  // Conciseness check
  const wordCount = body.split(' ').length;
  if (wordCount >= 120 && wordCount <= 180) details.conciseness = 100;
  else if (wordCount >= 100 && wordCount <= 200) details.conciseness = 75;
  else if (wordCount >= 80 && wordCount <= 250) details.conciseness = 50;
  else details.conciseness = 25;

  // Recruiter friendly
  if (body.includes('opportunity') || body.includes('excited')) details.recruiterFriendly += 25;
  if (body.includes('contribute') || body.includes('add value')) details.recruiterFriendly += 25;
  if (body.includes('team') || body.includes('company')) details.recruiterFriendly += 25;
  if (subject.length > 0 && subject.length < 80) details.recruiterFriendly += 25;

  // Response potential
  const hasQuestion = body.includes('?');
  const hasCallToAction = body.includes('look forward') || body.includes('hope to hear');
  if (hasQuestion) details.responsePotential += 25;
  if (hasCallToAction) details.responsePotential += 25;
  if (body.includes('LinkedIn') || body.includes('connect')) details.responsePotential += 25;
  if (personalization.specificPoint) details.responsePotential += 25;

  // Calculate averages
  Object.keys(details).forEach(key => {
    details[key as keyof typeof details] = Math.min(details[key as keyof typeof details], 100);
  });

  const overall = Object.values(details).reduce((a, b) => a + b, 0) / Object.values(details).length;

  return {
    overall: Math.round(overall),
    details
  };
};

// Get star rating
const getStarRating = (score: number) => {
  const stars = Math.round(score / 20);
  return '⭐'.repeat(Math.min(stars, 5)) + '☆'.repeat(Math.max(0, 5 - stars));
};

// Escape special regex characters
const escapeRegex = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Fallback personalization if AI is unavailable
const fallbackPersonalization = (data: any) => {
  return {
    skill1: `Advanced ${data.skill1 || 'Financial Analysis'}`,
    skill2: `Expert ${data.skill2 || 'Excel'}`,
    skill3: `Strategic ${data.skill3 || 'Business Intelligence'}`,
    specificPoint: `${data.companyName || 'the company'}'s innovative approach to ${data.specificPoint || 'finance'}`,
    body: `Dear ${data.recruiterName || 'Hiring Manager'},

I hope this email finds you well.

I recently submitted my application for the ${data.jobTitle || 'position'} at ${data.companyName || 'your company'}, and I wanted to personally thank you for considering my candidacy.

After researching ${data.companyName || 'your company'}'s work in the finance sector, I'm genuinely excited about the opportunity to contribute to your team. My background in ${data.skill1 || 'financial analysis'}, ${data.skill2 || 'Excel'}, and ${data.skill3 || 'data analytics'} aligns well with the requirements.

I've also sent you a LinkedIn connection request to stay connected professionally.

Thank you for your time and consideration. I look forward to hearing from you.

Warm regards,
${data.yourName || 'Applicant'}`
  };
};

export default function TemplatesPage() {
  // State for personalization
  const [personalization, setPersonalization] = useState({
    recruiterName: STUDENT_DATA.recruiterName,
    companyName: STUDENT_DATA.companyName,
    jobTitle: STUDENT_DATA.jobTitle,
    yourName: STUDENT_DATA.name,
    yourEmail: STUDENT_DATA.email,
    yourPhone: STUDENT_DATA.phone,
    yourLinkedIn: STUDENT_DATA.linkedin,
    skill1: 'Financial Analysis',
    skill2: 'Excel',
    skill3: 'Power BI',
    specificPoint: 'financial modeling and investment strategies',
    interviewDate: '',
    customMessage: ''
  });

  const [activeTemplate, setActiveTemplate] = useState('post-application');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [tone, setTone] = useState('formal');
  const [variation, setVariation] = useState('standard');
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    recruiterName: false,
    companyName: false,
    grammar: false,
    linkedin: false,
    resume: false,
    timing: false
  });

  // Get current template data
  const template = TEMPLATE_DATA[activeTemplate as keyof typeof TEMPLATE_DATA];
  
  // Generate personalized email
  const generatePersonalizedEmail = () => {
    let body = template.body;
    let subject = template.subject;

    // Replace placeholders - escape special characters for regex
    const replacements: Record<string, string> = {
      [STUDENT_DATA.recruiterName]: personalization.recruiterName || STUDENT_DATA.recruiterName,
      [STUDENT_DATA.companyName]: personalization.companyName || STUDENT_DATA.companyName,
      [STUDENT_DATA.jobTitle]: personalization.jobTitle || STUDENT_DATA.jobTitle,
      [STUDENT_DATA.name]: personalization.yourName || STUDENT_DATA.name,
      [STUDENT_DATA.email]: personalization.yourEmail || STUDENT_DATA.email,
      [STUDENT_DATA.phone]: personalization.yourPhone || STUDENT_DATA.phone,
      [STUDENT_DATA.linkedin]: personalization.yourLinkedIn || STUDENT_DATA.linkedin,
      'financial analysis': personalization.skill1 || 'financial analysis',
      'Excel': personalization.skill2 || 'Excel',
      'Power BI': personalization.skill3 || 'Power BI',
      'financial modeling and investment strategies': personalization.specificPoint || 'financial modeling',
      '[specific area]': personalization.specificPoint || 'finance',
      '[mention 2 key skills]': `${personalization.skill1 || 'analysis'} and ${personalization.skill2 || 'Excel'}`
    };

    Object.entries(replacements).forEach(([key, value]) => {
      // Escape special characters in the key for regex
      const escapedKey = escapeRegex(key);
      body = body.replace(new RegExp(escapedKey, 'g'), value);
      subject = subject.replace(new RegExp(escapedKey, 'g'), value);
    });

    return { body, subject };
  };

  const personalized = generatePersonalizedEmail();
  const qualityScore = calculateEmailQuality(personalized.body, personalized.subject, personalization);

  // Copy handlers
  const handleCopy = (text: string, id: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setCopiedType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopiedType(null);
      }, 2000);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setCopiedType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopiedType(null);
      }, 2000);
    });
  };

  const handleCopyEmail = () => {
    const fullEmail = `Subject: ${personalized.subject}\n\n${personalized.body}`;
    handleCopy(fullEmail, activeTemplate, 'full');
  };

  const handleCopyBody = () => {
    handleCopy(personalized.body, activeTemplate, 'body');
  };

  const handleCopySubject = () => {
    handleCopy(personalized.subject, activeTemplate, 'subject');
  };

  const handleCopyLinkedIn = () => {
    handleCopy(template.linkedinMessage, 'linkedin', 'linkedin');
  };

  // Generate PDF
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      const content = `
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1a1a2e; max-width: 800px; margin: 0 auto; }
              .header { text-align: center; border-bottom: 3px solid #2563EB; padding-bottom: 20px; margin-bottom: 30px; }
              .header h1 { font-size: 28px; color: #1a1a2e; margin: 0; }
              .email { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 20px 0; }
              .subject { background: #e2e8f0; padding: 10px 15px; border-radius: 6px; font-family: monospace; }
              .body { background: white; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0; font-family: monospace; white-space: pre-wrap; line-height: 1.6; }
              .quality { background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 15px 0; }
              .quality-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 10px; }
              .quality-item { text-align: center; }
              .quality-label { font-size: 11px; color: #64748b; }
              .quality-score { font-size: 18px; font-weight: bold; color: #16a34a; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 Thank You Email Template</h1>
              <p>${template.title}</p>
            </div>
            <div class="email">
              <div class="subject"><strong>Subject:</strong> ${personalized.subject}</div>
              <div class="body">${personalized.body}</div>
            </div>
            <div class="quality">
              <h3>📊 Email Quality Score: ${qualityScore.overall}%</h3>
              <div class="quality-grid">
                <div class="quality-item"><div class="quality-label">Professionalism</div><div class="quality-score">${qualityScore.details.professionalism}%</div></div>
                <div class="quality-item"><div class="quality-label">Personalization</div><div class="quality-score">${qualityScore.details.personalization}%</div></div>
                <div class="quality-item"><div class="quality-label">Conciseness</div><div class="quality-score">${qualityScore.details.conciseness}%</div></div>
                <div class="quality-item"><div class="quality-label">Recruiter Friendly</div><div class="quality-score">${qualityScore.details.recruiterFriendly}%</div></div>
                <div class="quality-item"><div class="quality-label">Response Potential</div><div class="quality-score">${qualityScore.details.responsePotential}%</div></div>
              </div>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
              Generated by Finlysta - Empowering Finance Careers
            </p>
          </body>
        </html>
      `;

      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `thank-you-email-${template.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Smart personalization (local, no external AI service)
  const handleAIPersonalize = async () => {
    setIsPersonalizing(true);
    setAiError(null);

    try {
      const result = fallbackPersonalization({
        recruiterName: personalization.recruiterName,
        companyName: personalization.companyName,
        jobTitle: personalization.jobTitle,
        yourName: personalization.yourName,
        skill1: personalization.skill1,
        skill2: personalization.skill2,
        skill3: personalization.skill3,
        specificPoint: personalization.specificPoint
      });

      setPersonalization({
        ...personalization,
        skill1: result.skill1 || personalization.skill1,
        skill2: result.skill2 || personalization.skill2,
        skill3: result.skill3 || personalization.skill3,
        specificPoint: result.specificPoint || personalization.specificPoint,
        customMessage: result.body || personalization.customMessage
      });

      setAiError('✅ Personalization complete! Check the updated fields above.');
      setTimeout(() => setAiError(null), 3000);
    } finally {
      setIsPersonalizing(false);
    }
  };

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Finlysta</span>
                <span className="text-xs text-gray-500 block -mt-1">Templates</span>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/jobs" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Jobs</Link>
              <Link href="/learning-hub" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Learning</Link>
              <button
                onClick={() => setShowMobilePreview(!showMobilePreview)}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <Smartphone className="w-4 h-4" />
                Preview
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-md">
            <Mail className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Interactive Email Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Thank You Email Generator
            <span className="block text-blue-600 text-2xl md:text-3xl mt-1">
              For Finance Job Applications
            </span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Personalize, customize, and perfect your thank-you emails with AI-powered suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Personalization */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                Personalize Your Email
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Recruiter Name</label>
                  <input
                    type="text"
                    value={personalization.recruiterName}
                    onChange={(e) => setPersonalization({...personalization, recruiterName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Company Name</label>
                  <input
                    type="text"
                    value={personalization.companyName}
                    onChange={(e) => setPersonalization({...personalization, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={personalization.jobTitle}
                    onChange={(e) => setPersonalization({...personalization, jobTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={personalization.yourName}
                    onChange={(e) => setPersonalization({...personalization, yourName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Your Email</label>
                  <input
                    type="email"
                    value={personalization.yourEmail}
                    onChange={(e) => setPersonalization({...personalization, yourEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Your Phone</label>
                  <input
                    type="text"
                    value={personalization.yourPhone}
                    onChange={(e) => setPersonalization({...personalization, yourPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Your LinkedIn URL</label>
                  <input
                    type="text"
                    value={personalization.yourLinkedIn}
                    onChange={(e) => setPersonalization({...personalization, yourLinkedIn: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Key Skill 1</label>
                  <input
                    type="text"
                    value={personalization.skill1}
                    onChange={(e) => setPersonalization({...personalization, skill1: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., Financial Analysis"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Key Skill 2</label>
                  <input
                    type="text"
                    value={personalization.skill2}
                    onChange={(e) => setPersonalization({...personalization, skill2: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., Excel"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Key Skill 3</label>
                  <input
                    type="text"
                    value={personalization.skill3}
                    onChange={(e) => setPersonalization({...personalization, skill3: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., Power BI"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Specific Discussion Point</label>
                  <input
                    type="text"
                    value={personalization.specificPoint}
                    onChange={(e) => setPersonalization({...personalization, specificPoint: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g., financial modeling"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Interview Date (Optional)</label>
                  <input
                    type="date"
                    value={personalization.interviewDate}
                    onChange={(e) => setPersonalization({...personalization, interviewDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Custom Message (Optional)</label>
                  <textarea
                    value={personalization.customMessage}
                    onChange={(e) => setPersonalization({...personalization, customMessage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    rows={2}
                    placeholder="Add a personal touch..."
                  />
                </div>
              </div>

              {/* AI Personalization Button */}
              <button
                onClick={handleAIPersonalize}
                disabled={isPersonalizing}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPersonalizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Personalizing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    ✨ Smart Personalize
                  </>
                )}
              </button>
              
              {/* AI Error Message */}
              {aiError && (
                <div className={`mt-2 text-xs p-2 rounded-lg border ${
                  aiError.includes('✅') 
                    ? 'text-green-600 bg-green-50 border-green-200' 
                    : 'text-amber-600 bg-amber-50 border-amber-200'
                }`}>
                  {aiError}
                </div>
              )}

              {/* Template Selector */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">Select Template</label>
                <div className="space-y-2">
                  {Object.keys(TEMPLATE_DATA).map((key) => {
                    const t = TEMPLATE_DATA[key as keyof typeof TEMPLATE_DATA];
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTemplate(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          activeTemplate === key
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span className="flex-1">{t.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${t.badgeColor}`}>
                          {t.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Center - Email Preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tone & Variation Selectors */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Tone:</span>
                <div className="flex gap-1">
                  {['formal', 'friendly', 'short'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        tone === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Variation:</span>
                <div className="flex gap-1">
                  {['standard', 'big4', 'startup', 'internship'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariation(v)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        variation === v
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Preview Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{template.title}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  {showMobilePreview ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {showMobilePreview ? 'Desktop' : 'Mobile'} Preview
                </button>
              </div>

              {/* Email Body */}
              <div className={`p-5 ${showMobilePreview ? 'max-w-sm mx-auto' : ''}`}>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-xs text-gray-500 mb-2 font-mono bg-white p-2 rounded border border-gray-100">
                    <strong>Subject:</strong> {personalized.subject}
                  </div>
                  <div className="font-mono text-sm whitespace-pre-wrap p-2 bg-white rounded border border-gray-100 max-h-[400px] overflow-y-auto">
                    {personalized.body}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      copiedId === activeTemplate && copiedType === 'full'
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {copiedId === activeTemplate && copiedType === 'full' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Full Email
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCopyBody}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      copiedId === activeTemplate && copiedType === 'body'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {copiedId === activeTemplate && copiedType === 'body' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Body Only
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCopySubject}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      copiedId === activeTemplate && copiedType === 'subject'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {copiedId === activeTemplate && copiedType === 'subject' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Subject Only
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCopyLinkedIn}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      copiedId === 'linkedin'
                        ? 'bg-green-600 text-white'
                        : 'bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90'
                    }`}
                  >
                    {copiedId === 'linkedin' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Linkedin className="w-4 h-4" />
                        Copy LinkedIn Msg
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    <Send className="w-4 h-4" />
                    Send to Gmail
                  </button>
                </div>

                {/* LinkedIn Message Preview */}
                <div className="mt-4 p-4 bg-[#f0f7ff] rounded-lg border border-[#0A66C2]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <h4 className="font-semibold text-sm text-gray-900">LinkedIn Connection Message</h4>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-gray-200">
                    {template.linkedinMessage}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Quality Score */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Email Quality Score
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">{qualityScore.overall}%</span>
                  <span className="text-lg">{getStarRating(qualityScore.overall)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(qualityScore.details).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-bold text-blue-600">{value}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Before Sending Checklist */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <ListChecks className="w-5 h-5 text-green-600" />
                Before Sending Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(checklist).map(([key, checked]) => (
                  <button
                    key={key}
                    onClick={() => toggleChecklist(key as keyof typeof checklist)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                      checked ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {checked ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${checked ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                      {key === 'recruiterName' && 'Recruiter name is correct'}
                      {key === 'companyName' && 'Company name is correct'}
                      {key === 'grammar' && 'No grammar mistakes'}
                      {key === 'linkedin' && 'LinkedIn profile added'}
                      {key === 'resume' && 'Resume attached'}
                      {key === 'timing' && 'Sent within 24 hours'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter Tips & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  Recruiter Insight
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Recruiters receive hundreds of applications. A short thank-you email won't guarantee an interview, 
                    but it can help you stand out if it's personalized and professionally written. Avoid generic copy-paste emails.
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-green-600">
                      <Clock className="w-3 h-3" />
                      30 seconds to read
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <FileText className="w-3 h-3" />
                      120-180 words recommended
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Common Mistakes
                </h4>
                <div className="space-y-2">
                  {template.commonMistakes.map((item, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded-lg">
                      <span className="text-red-500">{item.mistake}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="text-green-600">{item.fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ATS Compatibility */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-purple-600" />
                Works Well With
              </h4>
              <div className="flex flex-wrap gap-2">
                {['LinkedIn', 'Workday', 'Greenhouse', 'Lever', 'Careers Page', 'Naukri'].map((platform) => (
                  <span key={platform} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                    ✓ {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Next Steps in Your Career Journey
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { icon: FileText, label: 'Improve Resume', href: '/resume' },
                  { icon: Linkedin, label: 'Optimize LinkedIn', href: '/linkedin' },
                  { icon: MessageCircle, label: 'Interview Questions', href: '/interview' },
                  { icon: TrendingUp, label: 'Salary Guide', href: '/salary' },
                  { icon: BriefcaseIcon, label: 'Excel Interview Prep', href: '/excel' },
                  { icon: FileCheck, label: 'Finance Resume Template', href: '/resume-template' }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}