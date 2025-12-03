# 🚀 Naveen Kandula - Portfolio

A modern, production-ready portfolio website built with **Next.js 15**, **React 19**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **ShadCN UI**.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**

- Responsive design for all devices
- Dark/Light theme toggle
- Smooth Framer Motion animations
- Custom cursor effects
- Professional ShadCN UI components

### 🤖 **AI-Powered Chatbot**

- Gemini AI integration
- Guides users through the portfolio
- Smart navigation suggestions
- Answers questions about skills, projects, and services

### 📅 **Zoom Meeting Booking**

- Real Zoom meeting creation via API
- 4-step booking wizard
- Date and time selection
- Email confirmations to both parties
- Slot availability management

### 📧 **Email Notifications**

- Gmail SMTP integration
- Professional HTML email templates
- Confirmations for bookings, contact form, and project inquiries
- Both user and organizer notifications

### 📋 **Project Inquiry System**

- Multi-step project wizard
- Project type, budget, timeline selection
- Feature requirements
- Detailed project description

## 🛠️ Tech Stack

| Category       | Technologies                      |
| -------------- | --------------------------------- |
| **Framework**  | Next.js 15 (App Router)           |
| **Language**   | TypeScript 5                      |
| **Styling**    | TailwindCSS 4, ShadCN UI          |
| **Animations** | Framer Motion                     |
| **AI**         | Google Gemini API                 |
| **Email**      | Nodemailer (Gmail SMTP)           |
| **Video**      | Zoom API (Server-to-Server OAuth) |
| **Deployment** | Vercel                            |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Gmail account with App Password
- Zoom Server-to-Server OAuth app
- Google AI Studio API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Kandulanaveennaidu/naveen-portfolio-next.git
cd naveen-portfolio-next
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Configure your `.env.local`** (see Environment Variables section)

5. **Run development server**

```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# Zoom API
ZOOM_BASE_URL=https://api.zoom.us/v2/
ZOOM_ACCOUNT_ID=your_account_id
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret

# Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

# Organizer
ORGANIZER_EMAIL=your_email@gmail.com
ORGANIZER_NAME=Your Name

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### Getting API Keys

1. **Zoom API**: [Zoom Marketplace](https://marketplace.zoom.us/develop/create) → Create Server-to-Server OAuth app
2. **Gmail App Password**: [Google Account](https://myaccount.google.com/apppasswords) → Enable 2FA → Create App Password
3. **Gemini API**: [Google AI Studio](https://aistudio.google.com/app/apikey)

## 📄 Pages

| Page          | URL                     | Description                      |
| ------------- | ----------------------- | -------------------------------- |
| Home          | `/`                     | Main portfolio with all sections |
| Projects      | `/projects`             | Detailed project showcase        |
| Contact       | `/contact`              | Booking & contact options        |
| Zoom Booking  | `/contact?view=booking` | Schedule a Zoom meeting          |
| Send Message  | `/contact?view=message` | Contact form                     |
| Start Project | `/start-project`        | Project inquiry wizard           |

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kandulanaveennaidu/naveen-portfolio-next)

## 📧 Email Templates

The application includes professional HTML email templates for:

- ✅ Zoom meeting confirmations (customer & organizer)
- ✅ Contact form submissions (customer & organizer)
- ✅ Project inquiry submissions (customer & organizer)

## 👨‍💻 Author

**Naveen Kandula**

- GitHub: [@Kandulanaveennaidu](https://github.com/Kandulanaveennaidu)
- LinkedIn: [kandulanaveen1](https://linkedin.com/in/kandulanaveen1/)
- Email: kandulanaveennaidu017@gmail.com

---

⭐ **Star this repo if you find it helpful!**