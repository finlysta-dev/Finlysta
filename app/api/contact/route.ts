import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, topic, message } = body;

    console.log('📬 Contact form received:', { name, email, topic, message });

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set in environment variables');
      // For testing, just log the message and return success
      console.log('✅ Message received (no email sent - API key missing)');
      return NextResponse.json(
        { message: 'Message received! (Email not sent - API key missing)' },
        { status: 200 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Map topic to readable format
    const topicMap: Record<string, string> = {
      general: 'General Question',
      feedback: 'Feedback',
      correction: 'Report a Correction',
      support: 'Excel Support',
      suggestion: 'Content Suggestion',
      other: 'Other',
    };

    const formattedTopic = topicMap[topic] || topic || 'General Question';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.RESEND_TO_EMAIL || 'your-email@example.com'],
      subject: `New Contact Form: ${formattedTopic} from ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a73e8; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1a73e8; }
              .value { margin-top: 5px; background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; }
              .footer { margin-top: 20px; font-size: 12px; color: #718096; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📬 New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">📋 Topic</div>
                  <div class="value">${formattedTopic}</div>
                </div>
                
                <div class="field">
                  <div class="label">💬 Message</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="field">
                  <div class="label">🕐 Sent</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from the Finlysta contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Topic: ${formattedTopic}
Message: ${message}
Sent: ${new Date().toLocaleString()}
---
This message was sent from the Finlysta contact form.
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: `Failed to send message: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully:', data);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}