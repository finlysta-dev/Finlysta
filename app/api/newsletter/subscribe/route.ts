import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Welcome email template
const getWelcomeEmailHtml = (name: string, frequency: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Finlysta!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .card { background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #0A2540; }
    .logo span { color: #FFD700; }
    h1 { color: #0A2540; font-size: 24px; margin-bottom: 16px; }
    p { color: #4a5568; line-height: 1.6; margin-bottom: 16px; }
    .button { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0A2540; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .feature-list { background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .feature-item { display: flex; align-items: center; margin-bottom: 12px; }
    .feature-icon { width: 24px; height: 24px; background-color: #10B981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; color: white; font-size: 14px; }
    .footer { text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">Finlysta<span>.</span></div>
      </div>
      <h1>Welcome to Finlysta, ${name}! 🎉</h1>
      <p>Thank you for subscribing! You'll receive ${frequency === 'daily' ? 'daily' : 'weekly'} job updates with the latest financial analyst opportunities.</p>
      <div class="feature-list">
        <div class="feature-item"><div class="feature-icon">✓</div><span><strong>${frequency === 'daily' ? 'Daily Job Alerts' : 'Weekly Job Digest'}</strong> - ${frequency === 'daily' ? 'Daily' : 'Weekly'} updates</span></div>
        <div class="feature-item"><div class="feature-icon">✓</div><span><strong>Curated Jobs</strong> - Only verified positions</span></div>
        <div class="feature-item"><div class="feature-icon">✓</div><span><strong>Career Tips</strong> - Resume & interview guides</span></div>
      </div>
      <div style="text-align: center;">
        <a href="https://Finlysta.com/internships" class="button">Browse Latest Jobs →</a>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Finlysta. All rights reserved.</p>
        <p><a href="#" style="color: #94a3b8;">Unsubscribe</a> | <a href="#" style="color: #94a3b8;">Privacy Policy</a></p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { email, name, frequency, source } = await request.json();
    
    // Quick validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }
    
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your name' }, { status: 400 });
    }
    
    // Check if already subscribed (do this synchronously to prevent duplicate emails)
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (existingSubscriber && existingSubscriber.status === 'ACTIVE') {
      return NextResponse.json({ error: 'This email is already subscribed!' }, { status: 400 });
    }
    
    // Save to database
    if (existingSubscriber) {
      await prisma.subscriber.update({
        where: { email },
        data: { 
          status: 'ACTIVE', 
          name: name,
          unsubscribedAt: null,
          updatedAt: new Date(),
          preferences: {
            frequency: frequency || 'daily',
            jobAlerts: true
          }
        }
      });
    } else {
      await prisma.subscriber.create({
        data: {
          email,
          name: name,
          source: source || 'homepage_newsletter',
          status: 'ACTIVE',
          subscribedAt: new Date(),
          preferences: {
            frequency: frequency || 'daily',
            jobAlerts: true
          }
        }
      });
    }
    
    // Send welcome email via Resend (don't await - fire and forget to not block response)
    resend.emails.send({
      from: 'Finlysta <onboarding@resend.dev>',
      to: [email],
      subject: `Welcome to Finlysta, ${name}! 🎉`,
      html: getWelcomeEmailHtml(name, frequency || 'daily'),
    }).catch(err => {
      console.error('Failed to send welcome email:', err);
    });
    
    // Send response immediately
    return NextResponse.json({ 
      message: 'Subscribed successfully! Check your inbox for a welcome message.' 
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Something went wrong. Please try again later.'
    }, { status: 500 });
  }
}
