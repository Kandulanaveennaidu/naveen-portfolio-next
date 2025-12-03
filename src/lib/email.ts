import nodemailer from "nodemailer";

// Create transporter function to read env vars at runtime with trimming
function createTransporter() {
  return nodemailer.createTransport({
    host: (process.env.EMAIL_HOST || "smtp.gmail.com").trim(),
    port: parseInt((process.env.EMAIL_PORT || "587").trim()),
    secure: (process.env.EMAIL_SECURE || "false").trim() === "true",
    auth: {
      user: (process.env.EMAIL_USER || "").trim(),
      pass: (process.env.EMAIL_PASS || "").trim(),
    },
  });
}

// Get email configuration at runtime with trimming - use a getter-like pattern
const emailConfig = {
  get from() {
    const organizerName = (
      process.env.ORGANIZER_NAME || "Naveen Kandula"
    ).trim();
    const emailFrom = (process.env.EMAIL_FROM || "").trim();
    return `"${organizerName}" <${emailFrom}>`;
  },
  get organizerEmail() {
    const emailFrom = (process.env.EMAIL_FROM || "").trim();
    return (process.env.ORGANIZER_EMAIL || emailFrom).trim();
  },
  get organizerName() {
    return (process.env.ORGANIZER_NAME || "Naveen Kandula").trim();
  },
};

// Professional email template styles
const emailStyles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      background-color: #f8fafc;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
      padding: 40px 30px;
      text-align: center;
    }
    
    .header-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 18px;
      color: #1a1a2e;
      margin-bottom: 20px;
    }
    
    .message-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid #6366f1;
      padding: 20px;
      border-radius: 0 12px 12px 0;
      margin: 24px 0;
    }
    
    .details-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    
    .details-card h3 {
      color: #6366f1;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
      font-weight: 600;
    }
    
    .detail-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .detail-label {
      color: #64748b;
      font-size: 14px;
      width: 140px;
      flex-shrink: 0;
    }
    
    .detail-value {
      color: #1a1a2e;
      font-size: 14px;
      font-weight: 500;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      text-align: center;
    }
    
    .cta-button:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    }
    
    .zoom-info {
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      color: #ffffff;
    }
    
    .zoom-info h3 {
      font-size: 18px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .zoom-detail {
      background: rgba(255, 255, 255, 0.15);
      padding: 12px 16px;
      border-radius: 8px;
      margin: 8px 0;
      font-size: 14px;
    }
    
    .zoom-detail strong {
      display: block;
      font-size: 12px;
      opacity: 0.8;
      margin-bottom: 4px;
    }
    
    .footer {
      background: #1a1a2e;
      padding: 30px;
      text-align: center;
    }
    
    .footer-logo {
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 20px;
    }
    
    .footer-logo span {
      color: #8b5cf6;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-link {
      display: inline-block;
      width: 44px;
      height: 44px;
      margin: 0 8px;
      border-radius: 50%;
      text-decoration: none;
      vertical-align: middle;
    }
    
    .social-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    
    .footer-text {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 16px;
      line-height: 1.6;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
      margin: 24px 0;
    }

    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 12px;
      padding: 16px 20px;
      margin: 16px 0;
      border-left: 4px solid #f59e0b;
    }
    
    .highlight-box p {
      color: #92400e;
      font-size: 14px;
    }
  </style>
`;

// Professional email footer with working social icons
const emailFooter = `
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); padding: 40px 30px; text-align: center;">
    <!-- Logo -->
    <div style="margin-bottom: 24px;">
      <span style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -1px;">Naveen</span><span style="font-size: 32px; font-weight: 800; color: #8b5cf6;">.</span>
    </div>
    
    <!-- Social Links -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 24px auto;">
      <tr>
        <!-- GitHub -->
        <td style="padding: 0 8px;">
          <a href="https://github.com/Kandulanaveennaidu" target="_blank" style="display: inline-block; width: 44px; height: 44px; background: linear-gradient(135deg, #374151 0%, #1f2937 100%); border-radius: 50%; text-align: center; line-height: 44px; text-decoration: none;">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" width="22" height="22" style="vertical-align: middle; margin-top: 11px;" />
          </a>
        </td>
        <!-- LinkedIn -->
        <td style="padding: 0 8px;">
          <a href="https://linkedin.com/in/kandulanaveen1/" target="_blank" style="display: inline-block; width: 44px; height: 44px; background: linear-gradient(135deg, #0077b5 0%, #005885 100%); border-radius: 50%; text-align: center; line-height: 44px; text-decoration: none;">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" width="22" height="22" style="vertical-align: middle; margin-top: 11px;" />
          </a>
        </td>
        <!-- X (Twitter) -->
        <td style="padding: 0 8px;">
          <a href="https://x.com/Kandulanaveen8" target="_blank" style="display: inline-block; width: 44px; height: 44px; background: linear-gradient(135deg, #000000 0%, #14171a 100%); border-radius: 50%; text-align: center; line-height: 44px; text-decoration: none; border: 1px solid #374151;">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" alt="X" width="20" height="20" style="vertical-align: middle; margin-top: 12px;" />
          </a>
        </td>
      </tr>
    </table>
    
    <!-- Contact Info Box -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 24px auto; background: rgba(139, 92, 246, 0.15); border-radius: 12px; padding: 16px 24px;">
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; text-align: center;">
          📧 <a href="mailto:kandulanaveennaidu017@gmail.com" style="color: #a78bfa; text-decoration: none; font-weight: 500;">kandulanaveennaidu017@gmail.com</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; text-align: center;">
          📱 <a href="tel:+919705627977" style="color: #a78bfa; text-decoration: none; font-weight: 500;">+91 9705627977</a>
        </td>
      </tr>
    </table>
    
    <!-- Divider -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%); margin: 20px auto; max-width: 300px;"></div>
    
    <!-- Copyright -->
    <p style="color: #64748b; font-size: 13px; line-height: 1.8; margin: 0;">
      © ${new Date().getFullYear()} <span style="color: #ffffff; font-weight: 600;">Naveen Kandula</span>. All rights reserved.<br>
      <span style="color: #a78bfa; font-weight: 500;">Full Stack Developer</span> | Building Digital Experiences<br>
      <span style="font-size: 11px; color: #475569;">📍 Hyderabad, India</span>
    </p>
  </div>
`;

// Simpler notification footer for organizer emails
const organizerEmailFooter = `
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); padding: 30px; text-align: center;">
    <!-- Logo -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 16px auto;">
      <tr>
        <td>
          <span style="font-size: 22px; font-weight: 700; color: #ffffff;">Portfolio</span><span style="font-size: 22px; font-weight: 700; color: #8b5cf6;">.</span><span style="font-size: 18px; color: #64748b; margin-left: 4px;">Notifications</span>
        </td>
      </tr>
    </table>
    
    <!-- Notification Badge -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 16px auto;">
      <tr>
        <td style="background: rgba(139, 92, 246, 0.2); padding: 6px 16px; border-radius: 20px;">
          <span style="color: #a78bfa; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🔔 Automated Notification</span>
        </td>
      </tr>
    </table>
    
    <!-- Divider -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%); margin: 16px auto; max-width: 250px;"></div>
    
    <!-- Footer Text -->
    <p style="color: #64748b; font-size: 12px; line-height: 1.6; margin: 0;">
      This notification was sent from your portfolio website.<br>
      <a href="https://naveenkandula.dev" style="color: #a78bfa; text-decoration: none; font-weight: 500;">naveenkandula.dev</a>
    </p>
  </div>
`;

// ==================== ZOOM MEETING EMAIL TEMPLATES ====================

interface ZoomMeetingData {
  customerName: string;
  customerEmail: string;
  company?: string;
  projectDescription: string;
  meetingDate: string;
  meetingTime: string;
  meetingId: string;
  joinUrl: string;
  password: string;
}

// Email to Customer after Zoom booking
export function generateCustomerZoomEmailTemplate(
  data: ZoomMeetingData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="header-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
          <h1>Meeting Confirmed! 🎉</h1>
          <p>Your Zoom meeting has been scheduled successfully</p>
        </div>
        
        <div class="content">
          <p class="greeting">Hi <strong>${data.customerName}</strong>,</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            Thank you for scheduling a meeting with me! I'm excited to discuss your project and explore how we can work together to bring your ideas to life.
          </p>
          
          <div class="zoom-info">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Zoom Meeting Details
            </h3>
            <div class="zoom-detail">
              <strong>Meeting ID</strong>
              ${data.meetingId}
            </div>
            <div class="zoom-detail">
              <strong>Password</strong>
              ${data.password}
            </div>
            <div class="zoom-detail">
              <strong>Date & Time</strong>
              ${data.meetingDate} at ${data.meetingTime}
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${data.joinUrl}" class="cta-button">
              🚀 Join Zoom Meeting
            </a>
          </div>
          
          <div class="details-card">
            <h3>📋 Meeting Summary</h3>
            <div class="detail-row">
              <span class="detail-label">Your Name</span>
              <span class="detail-value">${data.customerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value">${data.customerEmail}</span>
            </div>
            ${
              data.company
                ? `
            <div class="detail-row">
              <span class="detail-label">Company</span>
              <span class="detail-value">${data.company}</span>
            </div>
            `
                : ""
            }
            <div class="detail-row">
              <span class="detail-label">Project Details</span>
              <span class="detail-value">${data.projectDescription}</span>
            </div>
          </div>
          
          <div class="highlight-box">
            <p>💡 <strong>Pro tip:</strong> Please join the meeting 2-3 minutes early to ensure a smooth start. Make sure your camera and microphone are working!</p>
          </div>
          
          <div class="divider"></div>
          
          <p style="color: #475569; font-size: 14px;">
            If you need to reschedule or have any questions before our meeting, feel free to reply to this email or reach out to me directly.
          </p>
          
          <p style="color: #475569; font-size: 14px; margin-top: 16px;">
            Looking forward to our conversation!
          </p>
          
          <p style="margin-top: 24px;">
            Best regards,<br>
            <strong style="color: #6366f1;">${
              emailConfig.organizerName
            }</strong><br>
            <span style="color: #64748b; font-size: 14px;">Full Stack Developer</span>
          </p>
        </div>
        
        ${emailFooter}
      </div>
    </body>
    </html>
  `;
}

// Email to Organizer (You) after Zoom booking
export function generateOrganizerZoomEmailTemplate(
  data: ZoomMeetingData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);">
          <div class="header-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1>New Meeting Booked! 📅</h1>
          <p>Someone has scheduled a Zoom meeting with you</p>
        </div>
        
        <div class="content">
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge">New Booking</span>
          </div>
          
          <p class="greeting">Hey ${emailConfig.organizerName},</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            Great news! <strong>${
              data.customerName
            }</strong> has just booked a Zoom meeting with you. Here are the details:
          </p>
          
          <div class="details-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #10b981;">
            <h3 style="color: #059669;">👤 Client Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${data.customerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value"><a href="mailto:${
                data.customerEmail
              }" style="color: #6366f1;">${data.customerEmail}</a></span>
            </div>
            ${
              data.company
                ? `
            <div class="detail-row">
              <span class="detail-label">Company</span>
              <span class="detail-value">${data.company}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="zoom-info">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Meeting Details
            </h3>
            <div class="zoom-detail">
              <strong>Date & Time</strong>
              ${data.meetingDate} at ${data.meetingTime}
            </div>
            <div class="zoom-detail">
              <strong>Meeting ID</strong>
              ${data.meetingId}
            </div>
            <div class="zoom-detail">
              <strong>Password</strong>
              ${data.password}
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${
              data.joinUrl
            }" class="cta-button" style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);">
              🎥 Start Zoom Meeting
            </a>
          </div>
          
          <div class="message-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left-color: #f59e0b;">
            <h4 style="color: #92400e; margin-bottom: 12px;">📝 Project Description</h4>
            <p style="color: #78350f; font-size: 14px; line-height: 1.8;">
              ${data.projectDescription}
            </p>
          </div>
          
          <div class="divider"></div>
          
          <div class="highlight-box" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-left-color: #8b5cf6;">
            <p style="color: #5b21b6;">
              💡 <strong>Quick Action:</strong> You can reply directly to this email to contact the client, or click the button above to start the meeting at the scheduled time.
            </p>
          </div>
        </div>
        
        ${organizerEmailFooter}
      </div>
    </body>
    </html>
  `;
}

// ==================== CONTACT FORM EMAIL TEMPLATES ====================

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email to Customer after Contact Form submission
export function generateCustomerContactEmailTemplate(
  data: ContactFormData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%);">
          <div class="header-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <h1>Message Received! ✉️</h1>
          <p>Thank you for reaching out</p>
        </div>
        
        <div class="content">
          <p class="greeting">Hi <strong>${data.name}</strong>,</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            Thank you for getting in touch! I've received your message and I'm excited to connect with you. I typically respond within 24-48 hours.
          </p>
          
          <div class="details-card">
            <h3>📨 Your Message Summary</h3>
            <div class="detail-row">
              <span class="detail-label">Subject</span>
              <span class="detail-value">${data.subject}</span>
            </div>
          </div>
          
          <div class="message-box">
            <h4 style="color: #1e40af; margin-bottom: 12px;">Your Message:</h4>
            <p style="color: #1e3a5f; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
              ${data.message}
            </p>
          </div>
          
          <div class="highlight-box">
            <p>💡 <strong>Want a faster response?</strong> Feel free to book a Zoom meeting directly on my website for a quick chat!</p>
          </div>
          
          <div class="divider"></div>
          
          <p style="color: #475569; font-size: 14px;">
            In the meantime, feel free to check out my latest projects on my portfolio or connect with me on social media.
          </p>
          
          <p style="margin-top: 24px;">
            Best regards,<br>
            <strong style="color: #6366f1;">${emailConfig.organizerName}</strong><br>
            <span style="color: #64748b; font-size: 14px;">Full Stack Developer</span>
          </p>
        </div>
        
        ${emailFooter}
      </div>
    </body>
    </html>
  `;
}

// Email to Organizer (You) after Contact Form submission
export function generateOrganizerContactEmailTemplate(
  data: ContactFormData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%);">
          <div class="header-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <h1>New Message! 📬</h1>
          <p>Someone contacted you through your portfolio</p>
        </div>
        
        <div class="content">
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">New Contact</span>
          </div>
          
          <p class="greeting">Hey ${emailConfig.organizerName},</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            You've received a new message from your portfolio contact form. Here are the details:
          </p>
          
          <div class="details-card" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 4px solid #f97316;">
            <h3 style="color: #c2410c;">👤 Contact Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${data.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value"><a href="mailto:${
                data.email
              }" style="color: #6366f1;">${data.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Subject</span>
              <span class="detail-value">${data.subject}</span>
            </div>
          </div>
          
          <div class="message-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left-color: #f59e0b;">
            <h4 style="color: #92400e; margin-bottom: 12px;">📝 Their Message</h4>
            <p style="color: #78350f; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
              ${data.message}
            </p>
          </div>
          
          <div style="text-align: center;">
            <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(
    data.subject
  )}" class="cta-button" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
              ✉️ Reply to ${data.name}
            </a>
          </div>
          
          <div class="divider"></div>
          
          <div class="highlight-box" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left-color: #10b981;">
            <p style="color: #065f46;">
              💡 <strong>Quick tip:</strong> Click the button above to reply directly, or copy the email address: <strong>${
                data.email
              }</strong>
            </p>
          </div>
        </div>
        
        ${organizerEmailFooter}
      </div>
    </body>
    </html>
  `;
}

// ==================== PROJECT INQUIRY EMAIL TEMPLATES ====================

interface ProjectInquiryData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  projectName?: string;
  budget: string;
  timeline: string;
  features: string[];
  description: string;
  existingWebsite?: string;
  additionalInfo?: string;
}

// Map IDs to readable labels
const projectTypeLabels: Record<string, string> = {
  "web-app": "Web Application",
  "mobile-app": "Mobile App",
  api: "API Development",
  ecommerce: "E-Commerce",
  dashboard: "Dashboard/Admin",
  realtime: "Real-time App",
  database: "Database Design",
  "ui-ux": "UI/UX Design",
};

const budgetLabels: Record<string, string> = {
  starter: "$1K - $5K",
  growth: "$5K - $15K",
  professional: "$15K - $30K",
  enterprise: "$30K+",
  discuss: "Let's Discuss",
};

const timelineLabels: Record<string, string> = {
  urgent: "Less than 1 month",
  standard: "1-3 months",
  relaxed: "3-6 months",
  flexible: "Flexible",
};

const featureLabels: Record<string, string> = {
  auth: "User Authentication",
  payments: "Payment Integration",
  realtime: "Real-time Features",
  analytics: "Analytics Dashboard",
  notifications: "Push Notifications",
  api: "Third-party APIs",
  responsive: "Responsive Design",
  seo: "SEO Optimization",
};

// Email to Customer after project inquiry submission
export function generateCustomerProjectInquiryEmailTemplate(
  data: ProjectInquiryData
): string {
  const projectType = projectTypeLabels[data.projectType] || data.projectType;
  const budget = budgetLabels[data.budget] || data.budget;
  const timeline = timelineLabels[data.timeline] || data.timeline;
  const features = data.features.map((f) => featureLabels[f] || f).join(", ");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);">
          <div class="header-icon">
            <img src="https://img.icons8.com/ios-filled/80/ffffff/rocket.png" alt="Rocket" width="40" height="40" />
          </div>
          <h1>Project Request Received! 🚀</h1>
          <p>Thank you for your interest in working together</p>
        </div>
        
        <div class="content">
          <p class="greeting">Hi <strong>${data.name}</strong>,</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            Thank you for submitting your project inquiry! I've received all the details and I'm excited about the opportunity to work with you. I'll review everything carefully and get back to you within <strong>24-48 hours</strong> with a detailed proposal.
          </p>
          
          <div class="details-card" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #10b981;">
            <h3 style="color: #059669;">📋 Project Summary</h3>
            <div class="detail-row">
              <span class="detail-label">Project Type</span>
              <span class="detail-value">${projectType}</span>
            </div>
            ${
              data.projectName
                ? `
            <div class="detail-row">
              <span class="detail-label">Project Name</span>
              <span class="detail-value">${data.projectName}</span>
            </div>
            `
                : ""
            }
            <div class="detail-row">
              <span class="detail-label">Budget Range</span>
              <span class="detail-value">${budget}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Timeline</span>
              <span class="detail-value">${timeline}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Features</span>
              <span class="detail-value">${features || "Not specified"}</span>
            </div>
          </div>
          
          <div class="message-box">
            <h4 style="color: #1e40af; margin-bottom: 12px;">💡 What Happens Next?</h4>
            <ol style="color: #475569; font-size: 14px; line-height: 2; padding-left: 20px;">
              <li>I'll review your project requirements in detail</li>
              <li>Research the best approach and technologies for your needs</li>
              <li>Prepare a comprehensive proposal with timeline and cost estimate</li>
              <li>Reach out to schedule a call to discuss further</li>
            </ol>
          </div>
          
          <div class="highlight-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left-color: #f59e0b;">
            <p style="color: #92400e;">
              💬 <strong>Have questions?</strong> Feel free to reply to this email or reach out directly at <a href="mailto:kandulanaveennaidu017@gmail.com" style="color: #b45309;">kandulanaveennaidu017@gmail.com</a>
            </p>
          </div>
          
          <div class="divider"></div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Looking forward to creating something amazing together! ✨
          </p>
        </div>
        
        ${emailFooter}
      </div>
    </body>
    </html>
  `;
}

// Email to Organizer (You) after project inquiry submission
export function generateOrganizerProjectInquiryEmailTemplate(
  data: ProjectInquiryData
): string {
  const projectType = projectTypeLabels[data.projectType] || data.projectType;
  const budget = budgetLabels[data.budget] || data.budget;
  const timeline = timelineLabels[data.timeline] || data.timeline;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);">
          <div class="header-icon">
            <img src="https://img.icons8.com/ios-filled/80/ffffff/new.png" alt="New" width="40" height="40" />
          </div>
          <h1>New Project Inquiry! 🎯</h1>
          <p>A potential client has submitted a project request</p>
        </div>
        
        <div class="content">
          <p class="greeting">Hey ${emailConfig.organizerName},</p>
          
          <p style="color: #475569; margin-bottom: 24px;">
            Exciting news! You've received a new project inquiry from your portfolio. Here are all the details:
          </p>
          
          <!-- Client Information -->
          <div class="details-card" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 4px solid #f97316;">
            <h3 style="color: #c2410c;">👤 Client Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name</span>
              <span class="detail-value">${data.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email</span>
              <span class="detail-value"><a href="mailto:${
                data.email
              }" style="color: #6366f1;">${data.email}</a></span>
            </div>
            ${
              data.company
                ? `
            <div class="detail-row">
              <span class="detail-label">Company</span>
              <span class="detail-value">${data.company}</span>
            </div>
            `
                : ""
            }
            ${
              data.phone
                ? `
            <div class="detail-row">
              <span class="detail-label">Phone</span>
              <span class="detail-value"><a href="tel:${data.phone}" style="color: #6366f1;">${data.phone}</a></span>
            </div>
            `
                : ""
            }
          </div>
          
          <!-- Project Details -->
          <div class="details-card" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #3b82f6;">
            <h3 style="color: #1d4ed8;">📦 Project Details</h3>
            <div class="detail-row">
              <span class="detail-label">Project Type</span>
              <span class="detail-value"><span class="badge">${projectType}</span></span>
            </div>
            ${
              data.projectName
                ? `
            <div class="detail-row">
              <span class="detail-label">Project Name</span>
              <span class="detail-value">${data.projectName}</span>
            </div>
            `
                : ""
            }
            <div class="detail-row">
              <span class="detail-label">Budget Range</span>
              <span class="detail-value" style="color: #059669; font-weight: 600;">💰 ${budget}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Timeline</span>
              <span class="detail-value">⏱️ ${timeline}</span>
            </div>
            ${
              data.existingWebsite
                ? `
            <div class="detail-row">
              <span class="detail-label">Existing Website</span>
              <span class="detail-value"><a href="${data.existingWebsite}" style="color: #6366f1;" target="_blank">${data.existingWebsite}</a></span>
            </div>
            `
                : ""
            }
          </div>
          
          <!-- Features Required -->
          <div class="details-card" style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-left: 4px solid #8b5cf6;">
            <h3 style="color: #7c3aed;">⚡ Features Required</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
              ${
                data.features.length > 0
                  ? data.features
                      .map(
                        (f) =>
                          `<span style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">${
                            featureLabels[f] || f
                          }</span>`
                      )
                      .join("")
                  : '<span style="color: #64748b;">No specific features selected</span>'
              }
            </div>
          </div>
          
          <!-- Project Description -->
          <div class="message-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left-color: #f59e0b;">
            <h4 style="color: #92400e; margin-bottom: 12px;">📝 Project Description</h4>
            <p style="color: #78350f; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
              ${data.description}
            </p>
          </div>
          
          ${
            data.additionalInfo
              ? `
          <div class="message-box" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left-color: #10b981;">
            <h4 style="color: #065f46; margin-bottom: 12px;">📌 Additional Information</h4>
            <p style="color: #064e3b; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
              ${data.additionalInfo}
            </p>
          </div>
          `
              : ""
          }
          
          <div style="text-align: center;">
            <a href="mailto:${
              data.email
            }?subject=Re: Your Project Inquiry - ${projectType}" class="cta-button" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
              ✉️ Reply to ${data.name}
            </a>
          </div>
          
          <div class="divider"></div>
          
          <div class="highlight-box" style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-left-color: #ef4444;">
            <p style="color: #991b1b;">
              ⚡ <strong>Action Required:</strong> Respond within 24-48 hours for best conversion. Client email: <strong>${
                data.email
              }</strong>
            </p>
          </div>
        </div>
        
        ${organizerEmailFooter}
      </div>
    </body>
    </html>
  `;
}

// ==================== SEND EMAIL FUNCTIONS ====================

export async function sendZoomBookingEmails(
  data: ZoomMeetingData
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    // Send email to customer
    await transporter.sendMail({
      from: emailConfig.from,
      to: data.customerEmail,
      subject: `🎉 Meeting Confirmed with ${emailConfig.organizerName} - ${data.meetingDate}`,
      html: generateCustomerZoomEmailTemplate(data),
    });

    // Send email to organizer (you)
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.organizerEmail,
      replyTo: data.customerEmail,
      subject: `📅 New Meeting Booking: ${data.customerName} - ${data.meetingDate} at ${data.meetingTime}`,
      html: generateOrganizerZoomEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending Zoom booking emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export async function sendContactFormEmails(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    // Send confirmation email to customer
    await transporter.sendMail({
      from: emailConfig.from,
      to: data.email,
      subject: `✉️ Thanks for reaching out, ${data.name}! - Message Received`,
      html: generateCustomerContactEmailTemplate(data),
    });

    // Send notification email to organizer (you)
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.organizerEmail,
      replyTo: data.email,
      subject: `📬 New Contact Form Message: ${data.subject} - from ${data.name}`,
      html: generateOrganizerContactEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact form emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

// Send project inquiry emails to both customer and organizer
export async function sendProjectInquiryEmails(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  projectName?: string;
  budget: string;
  timeline: string;
  features: string[];
  description: string;
  existingWebsite?: string;
  additionalInfo?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    const ptLabels: Record<string, string> = {
      "web-app": "Web Application",
      "mobile-app": "Mobile App",
      api: "API Development",
      ecommerce: "E-Commerce",
      dashboard: "Dashboard/Admin",
      realtime: "Real-time App",
      database: "Database Design",
      "ui-ux": "UI/UX Design",
    };

    const projectType = ptLabels[data.projectType] || data.projectType;
    const budgetLabel = budgetLabels[data.budget] || data.budget;

    // Send confirmation email to customer
    await transporter.sendMail({
      from: emailConfig.from,
      to: data.email,
      subject: `🚀 Project Request Received - ${projectType}`,
      html: generateCustomerProjectInquiryEmailTemplate(data),
    });

    // Send notification email to organizer (you)
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.organizerEmail,
      replyTo: data.email,
      subject: `🎯 New Project Inquiry: ${projectType} - ${data.name} (${budgetLabel})`,
      html: generateOrganizerProjectInquiryEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending project inquiry emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
