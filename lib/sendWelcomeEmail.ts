import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  const firstName = name.split(" ")[0];
  const year = new Date().getFullYear();

  try {
    const data = await resend.emails.send({
      from: "Internify <hello@tryinternify.in>",
      to: email,
      subject: "Welcome to Internify! 🚀 Your Internship Journey Starts Here",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Internify</title>
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
        </head>
        <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <!-- Outer wrapper -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
            <tr>
              <td align="center" style="padding:40px 16px;">

                <!-- Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

                  <!-- LOGO — swap the td below for an <img> once you have a public CDN URL -->
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="background:#4F46E5;border-radius:12px;padding:10px 22px;" align="center">
                            <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;text-decoration:none;">
                              intern<span style="color:#A5B4FC;">ify</span>
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- MAIN CARD -->
                  <tr>
                    <td style="background:#ffffff;border-radius:16px;padding:40px 36px;" bgcolor="#ffffff">

                      <!-- Welcome badge -->
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="background:#EEF2FF;border-radius:20px;padding:6px 14px;">
                            <span style="color:#4F46E5;font-weight:700;font-size:13px;letter-spacing:0.01em;">🎉 Welcome Aboard!</span>
                          </td>
                        </tr>
                      </table>

                      <!-- Greeting -->
                      <h1 style="font-size:28px;font-weight:800;color:#111827;margin:20px 0 6px 0;letter-spacing:-0.02em;">
                        Hey ${firstName}! 👋
                      </h1>
                      <p style="font-size:17px;color:#4B5563;margin:0 0 24px 0;line-height:1.55;">
                        You're officially part of the Internify community.
                      </p>

                      <!-- Success banner -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                        <tr>
                          <td style="background:#F0FDF4;border-left:4px solid #10B981;border-radius:0 8px 8px 0;padding:14px 16px;">
                            <p style="margin:0;color:#065F46;font-size:14px;font-weight:600;">
                              ✅ Your account has been created! You're all set to start your internship journey.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- What's Next heading -->
                      <h2 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 28px 0;">What's Next? 🚀</h2>

                      <!-- Step 1 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                        <tr>
                          <td width="56" valign="top">
                            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="48" height="48" style="width:48px;height:48px;min-width:48px;background:#4F46E5;border-radius:50%;text-align:center;vertical-align:middle;font-size:20px;font-weight:800;color:#ffffff;line-height:1;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
                                  1
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="padding-left:16px;" valign="top">
                            <h3 style="font-size:17px;font-weight:700;color:#111827;margin:0 0 5px 0;">Complete Your Profile</h3>
                            <p style="font-size:14px;color:#6B7280;margin:0;line-height:1.55;">Add your skills, education, and resume to get matched with the best opportunities.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 2 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                        <tr>
                          <td width="56" valign="top">
                            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="48" height="48" style="width:48px;height:48px;min-width:48px;background:#4F46E5;border-radius:50%;text-align:center;vertical-align:middle;font-size:20px;font-weight:800;color:#ffffff;line-height:1;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
                                  2
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="padding-left:16px;" valign="top">
                            <h3 style="font-size:17px;font-weight:700;color:#111827;margin:0 0 5px 0;">Explore Internships</h3>
                            <p style="font-size:14px;color:#6B7280;margin:0;line-height:1.55;">Browse 1000+ internships from top companies looking for fresh talent like you.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 3 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                        <tr>
                          <td width="56" valign="top">
                            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="48" height="48" style="width:48px;height:48px;min-width:48px;background:#4F46E5;border-radius:50%;text-align:center;vertical-align:middle;font-size:20px;font-weight:800;color:#ffffff;line-height:1;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
                                  3
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="padding-left:16px;" valign="top">
                            <h3 style="font-size:17px;font-weight:700;color:#111827;margin:0 0 5px 0;">Apply &amp; Get Hired</h3>
                            <p style="font-size:14px;color:#6B7280;margin:0;line-height:1.55;">Directly connect with hiring teams. No middlemen, no gatekeeping.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                        <tr>
                          <td align="center">
                            <a
                              href="https://tryinternify.in/dashboard"
                              style="display:inline-block;background:#4F46E5;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:10px;font-weight:700;font-size:16px;letter-spacing:0.01em;"
                            >
                              Get Started →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="border-top:1px solid #E5E7EB;padding-top:28px;">

                            <p style="text-align:center;font-size:13px;font-weight:700;color:#111827;margin:0 0 20px 0;">✨ What Makes Internify Special?</p>

                            <!-- Feature grid row 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                              <tr>
                                <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:16px 12px;text-align:center;">
                                  <p style="font-size:24px;margin:0 0 6px 0;">🎯</p>
                                  <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 3px 0;">Direct Applications</p>
                                  <p style="font-size:11px;color:#9CA3AF;margin:0;">No middlemen</p>
                                </td>
                                <td width="4%"></td>
                                <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:16px 12px;text-align:center;">
                                  <p style="font-size:24px;margin:0 0 6px 0;">🎓</p>
                                  <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 3px 0;">Built for Students</p>
                                  <p style="font-size:11px;color:#9CA3AF;margin:0;">Perfect for freshers</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Feature grid row 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:16px 12px;text-align:center;">
                                  <p style="font-size:24px;margin:0 0 6px 0;">💰</p>
                                  <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 3px 0;">Free Forever</p>
                                  <p style="font-size:11px;color:#9CA3AF;margin:0;">No hidden fees</p>
                                </td>
                                <td width="4%"></td>
                                <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:16px 12px;text-align:center;">
                                  <p style="font-size:24px;margin:0 0 6px 0;">⚡</p>
                                  <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 3px 0;">Fast Matching</p>
                                  <p style="font-size:11px;color:#9CA3AF;margin:0;">AI-powered suggestions</p>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center" style="padding:28px 0 8px 0;border-top:1px solid #E5E7EB;margin-top:28px;">
                      <p style="font-size:12px;color:#9CA3AF;margin:0 0 6px 0;">
                        Need help? Contact us at
                        <a href="mailto:internifyhelp@gmail.com" style="color:#4F46E5;text-decoration:none;">internifyhelp@gmail.com</a>
                      </p>
                      <p style="font-size:12px;color:#9CA3AF;margin:0 0 6px 0;">
                        © ${year} Internify. All rights reserved.
                      </p>
                      <p style="font-size:11px;color:#D1D5DB;margin:0;">
                        You're receiving this because you created an account on Internify.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully to:", email);
    return data;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return null;
  }
}