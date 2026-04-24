import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string, frequency: string) {
  const welcomeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Finlysta!</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .logo { font-size: 28px; font-weight: bold; color: #0A2540; text-align: center; margin-bottom: 30px; }
        .logo span { color: #FFD700; }
        h1 { color: #0A2540; font-size: 24px; margin-bottom: 16px; }
        p { color: #4a5568; line-height: 1.6; margin-bottom: 16px; }
        .button { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0A2540; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="logo">Finlysta<span>.</span></div>
          <h1>Welcome to Finlysta, ${name}! 🎉</h1>
          <p>Thank you for subscribing! You'll receive ${frequency === 'daily' ? 'daily' : 'weekly'} job updates with the latest financial analyst opportunities.</p>
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

  try {
    const { data, error } = await resend.emails.send({
      from: 'Finlysta <onboarding@resend.dev>', // Resend's default domain for testing
      to: [to],
      subject: `Welcome to Finlysta, ${name}! 🎉`,
      html: welcomeHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
