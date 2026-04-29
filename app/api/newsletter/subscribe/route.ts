import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    
    const { name, email, frequency, interests, source } = body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Validate name
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Get IP and User Agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Determine interestedIn based on selection
    const wantsJobs = interests?.jobs === true;
    const wantsInternships = interests?.internships === true;
    
    let interestedIn = null;
    if (wantsJobs && wantsInternships) {
      interestedIn = 'jobs,internships';
    } else if (wantsJobs) {
      interestedIn = 'jobs';
    } else if (wantsInternships) {
      interestedIn = 'internships';
    } else {
      return NextResponse.json(
        { error: 'Please select at least Jobs or Internships' },
        { status: 400 }
      );
    }
    
    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (existing && existing.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'This email is already subscribed!' },
        { status: 400 }
      );
    }
    
    // Create or update subscriber
    let subscriber;
    try {
      subscriber = await prisma.subscriber.upsert({
        where: { email },
        update: {
          status: 'ACTIVE',
          unsubscribedAt: null,
          name: name,
          ipAddress,
          userAgent,
          source: source || 'newsletter_form',
          interestedIn: interestedIn,
          frequency: frequency || 'weekly',
          updatedAt: new Date(),
        },
        create: {
          email,
          name,
          status: 'ACTIVE',
          ipAddress,
          userAgent,
          source: source || 'newsletter_form',
          interestedIn: interestedIn,
          frequency: frequency || 'weekly',
        },
      });
      console.log('Subscriber saved:', subscriber.email);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      );
    }
    
    // Send welcome email
    try {
      const interestText = wantsJobs && wantsInternships 
        ? 'jobs and internships'
        : wantsJobs 
          ? 'entry-level jobs' 
          : 'paid internships';
      
      const mainCtaLink = wantsJobs && wantsInternships 
        ? 'https://finlysta.com'
        : wantsJobs 
          ? 'https://finlysta.com/jobs' 
          : 'https://finlysta.com/internships';
      
      const welcomeHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Finlysta</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.5;
              background-color: #f4f6f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .email-card {
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            .header {
              background: #ffffff;
              padding: 40px 32px;
              text-align: center;
              border-bottom: 1px solid #eef2f6;
            }
            .logo {
              max-width: 140px;
              height: auto;
              margin-bottom: 16px;
            }
            .header h1 {
              color: #0f172a;
              font-size: 28px;
              font-weight: 700;
              margin-top: 16px;
              letter-spacing: -0.5px;
            }
            .header-sub {
              color: #64748b;
              font-size: 14px;
              margin-top: 8px;
            }
            .content {
              padding: 40px 32px;
            }
            .greeting {
              font-size: 24px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 16px;
            }
            .greeting span {
              background: linear-gradient(135deg, #2563eb, #1e40af);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .intro-text {
              color: #475569;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 24px;
            }
            .features-grid {
              display: flex;
              flex-direction: column;
              gap: 16px;
              margin: 24px 0;
            }
            .feature-card {
              background: #f8fafc;
              border-radius: 16px;
              padding: 20px;
              border: 1px solid #e2e8f0;
            }
            .feature-icon {
              font-size: 28px;
              margin-bottom: 12px;
            }
            .feature-title {
              font-size: 16px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 6px;
            }
            .feature-desc {
              font-size: 14px;
              color: #64748b;
              line-height: 1.5;
            }
            .value-section {
              background: #f0f9ff;
              border-radius: 16px;
              padding: 24px;
              margin: 24px 0;
              border: 1px solid #bae6fd;
            }
            .value-title {
              font-size: 16px;
              font-weight: 700;
              color: #0369a1;
              margin-bottom: 12px;
            }
            .value-list {
              list-style: none;
              padding: 0;
            }
            .value-list li {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
              color: #0f172a;
              font-size: 14px;
            }
            .note {
              background: #fefce8;
              border-left: 3px solid #eab308;
              padding: 14px 16px;
              border-radius: 10px;
              margin: 24px 0;
              font-size: 13px;
              color: #854d0e;
            }
            .footer {
              background: #f8fafc;
              padding: 28px 32px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer-links {
              margin-bottom: 16px;
            }
            .footer-links a {
              color: #64748b;
              text-decoration: none;
              font-size: 12px;
              margin: 0 8px;
            }
            .social-links {
              margin: 16px 0;
            }
            .social-links a {
              color: #94a3b8;
              text-decoration: none;
              font-size: 13px;
              margin: 0 10px;
            }
            .copyright {
              color: #94a3b8;
              font-size: 11px;
              margin-top: 16px;
            }
            @media (max-width: 480px) {
              .content { padding: 28px 20px; }
              .header { padding: 32px 24px; }
              .greeting { font-size: 22px; }
              .logo { max-width: 110px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-card">
              <div class="header">
                <img src="https://finlysta.com/Finlysta.png" alt="Finlysta" class="logo">
                <h1>Welcome to Finlysta 🚀</h1>
                <div class="header-sub">Your launchpad for a career in finance</div>
              </div>
              
              <div class="content">
                <div class="greeting">
                  Hey <span>${name || 'there'}</span>! 👋
                </div>
                
                <p class="intro-text">
                  Thanks for joining <strong>Finlysta</strong> — the platform built specifically for finance students and graduates like you.
                </p>
                
                <p class="intro-text">
                  We know how frustrating job hunting can be. Endless scrolling, outdated listings, and no clarity on what's legit. That's why we built Finlysta — to make finding your first finance role simple and stress-free.
                </p>
                
                <div class="features-grid">
                  <div class="feature-card">
                    <div class="feature-icon">📬</div>
                    <div class="feature-title">${frequency === 'daily' ? 'Daily' : 'Weekly'} Updates</div>
                    <div class="feature-desc">Fresh ${interestText} delivered straight to your inbox — no more endless searching.</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">✅</div>
                    <div class="feature-title">Manually Verified Listings</div>
                    <div class="feature-desc">Every single opportunity is reviewed by our team. No spam, no ghost jobs.</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">💰</div>
                    <div class="feature-title">Transparent Pay</div>
                    <div class="feature-desc">Clear salary and stipend info upfront. No surprises.</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">📚</div>
                    <div class="feature-title">Free Learning Resources</div>
                    <div class="feature-desc">Excel tutorials, interview guides, and financial modeling — all free.</div>
                  </div>
                </div>
                
                <div class="value-section">
                  <div class="value-title">✨ Here's what makes Finlysta different:</div>
                  <ul class="value-list">
                    <li>🎯 100% focused on financial analyst roles — nothing else</li>
                    <li>🔍 Every listing manually verified by our team</li>
                    <li>💎 Completely free for students — always</li>
                    <li>📈 Real salaries and stipends, no hiding</li>
                  </ul>
                </div>
                
                <div class="note">
                  💡 <strong>Quick tip:</strong> Check the opportunities daily — the best roles get filled fast. We recommend checking every morning!
                </div>
                
                <!-- CTA BUTTON WITH INLINE STYLES - FIXED -->
                <div style="text-align: center; margin: 24px 0 16px 0;">
                  <a href="${mainCtaLink}" 
                     style="
                       display: inline-block;
                       background: #2563eb;
                       background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                       color: #ffffff !important;
                       text-decoration: none;
                       padding: 14px 32px;
                       border-radius: 40px;
                       font-weight: 600;
                       font-size: 16px;
                       text-align: center;
                       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                       -webkit-text-fill-color: #ffffff;
                     "
                     target="_blank">
                    Browse ${interestText} →
                  </a>
                </div>
                
                <p style="font-size: 13px; color: #64748b; text-align: center; margin-top: 20px;">
                  Start exploring now. Your first opportunity is waiting.
                </p>
              </div>
              
              <div class="footer">
                <div class="footer-links">
                  <a href="https://finlysta.com/jobs">Jobs</a> •
                  <a href="https://finlysta.com/internships">Internships</a> •
                  <a href="https://finlysta.com/learn">Learn</a> •
                  <a href="https://finlysta.com/about">About</a>
                </div>
                <div class="social-links">
                  <a href="https://www.linkedin.com/company/finlysta">LinkedIn</a> •
                  <a href="https://www.instagram.com/finlysta">Instagram</a> •
                  <a href="https://x.com/finlysta">Twitter</a>
                </div>
                <div class="footer-links">
                  <a href="https://finlysta.com/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> •
                  <a href="https://finlysta.com/privacy">Privacy Policy</a> •
                  <a href="https://finlysta.com/contact">Contact</a>
                </div>
                <div class="copyright">
                  © ${new Date().getFullYear()} Finlysta. All rights reserved.
                </div>
                <div class="copyright" style="margin-top: 12px;">
                  You're receiving this because you subscribed to the Finlysta newsletter.
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Only send if Resend API key exists
      if (process.env.RESEND_API_KEY) {
        let fromEmail = "Finlysta <newsletter@finlysta.com>";
        
        if (process.env.USE_TEST_EMAIL === 'true') {
          fromEmail = "Finlysta <onboarding@resend.dev>";
        }
        
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: `Welcome to Finlysta, ${name || 'there'}! 🚀 Your finance career starts here`,
          html: welcomeHtml,
        });
        
        if (error) {
          console.error('Resend error:', error);
        } else {
          console.log('Welcome email sent:', data);
        }
      }
    } catch (emailError) {
      console.error('Email error (non-critical):', emailError);
      // Don't fail the subscription
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}