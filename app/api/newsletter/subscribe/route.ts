import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, frequency, source } = body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
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
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {
        status: 'ACTIVE',
        unsubscribedAt: null,
        name: name || existing?.name,
        ipAddress,
        userAgent,
        preferences: { frequency: frequency || 'weekly' }
      },
      create: {
        email,
        name: name || null,
        status: 'ACTIVE',
        ipAddress,
        userAgent,
        source: source || 'newsletter_form',
        preferences: { frequency: frequency || 'weekly' }
      }
    });
    
    console.log('Subscriber saved:', subscriber.email);
    
    // Send welcome email
    try {
      const welcomeHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Finlysta Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            h1 { margin: 0; font-size: 28px; }
            .unsubscribe { color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Finlysta! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hello ${name || 'there'}!</h2>
              <p>Thank you for subscribing to the Finlysta newsletter. You'll now receive ${frequency === 'daily' ? 'daily' : 'weekly'} updates with the latest entry-level financial analyst jobs and internships.</p>
              
              <p>Here's what you can expect:</p>
              <ul>
                <li>🔥 Latest financial analyst job openings</li>
                <li>📊 Internship opportunities at top companies</li>
                <li>💡 Career tips and interview advice</li>
                <li>📈 Industry trends and insights</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://finlysta.com" class="button">Browse Jobs Now</a>
              </div>
              
              <p>While you wait for your first newsletter, check out our latest opportunities:</p>
              <ul>
                <li><a href="https://finlysta.com/jobs">Entry Level Financial Analyst Jobs</a></li>
                <li><a href="https://finlysta.com/internships">Paid Finance Internships</a></li>
                <li><a href="https://finlysta.com/learn">Free Learning Resources</a></li>
              </ul>
              
              <p>We're committed to helping you start your finance career. If you have any questions, simply reply to this email.</p>
              
              <p>Best regards,<br>
              <strong>The Finlysta Team</strong></p>
            </div>
            <div class="footer">
              <p>You received this email because you subscribed to the Finlysta newsletter.</p>
              <p class="unsubscribe">
                <a href="https://finlysta.com/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | 
                <a href="https://finlysta.com/privacy">Privacy Policy</a>
              </p>
              <p>© 2024 Finlysta. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const { data, error } = await resend.emails.send({
        from: 'Finlysta <newsletter@finlysta.com>',
        to: [email],
        subject: `Welcome to Finlysta! ${name ? '👋 ' + name : 'Start your finance journey'}`,
        html: welcomeHtml,
      });
      
      if (error) {
        console.error('Resend error:', error);
      } else {
        console.log('Welcome email sent:', data);
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}