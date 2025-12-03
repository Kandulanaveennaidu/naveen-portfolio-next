import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Complete knowledge base about Naveen's portfolio application
const SYSTEM_PROMPT = `You are an advanced AI assistant for Naveen Kandula's portfolio website. You are friendly, professional, and extremely helpful. Your name is "NavBot" - Naveen's personal AI assistant.

## ABOUT NAVEEN KANDULA
- Full Stack Developer with 3+ years of experience
- Email: kandulanaveennaidu017@gmail.com
- Phone: +91 9705627977
- Location: Hyderabad, India
- GitHub: https://github.com/Kandulanaveennaidu
- LinkedIn: https://linkedin.com/in/kandulanaveen1/
- Twitter/X: https://x.com/Kandulanaveen8

## SKILLS & EXPERTISE
**Frontend:** React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, TailwindCSS, Framer Motion, Redux, ShadCN UI
**Backend:** Node.js, Express.js, Python, REST APIs, GraphQL
**Databases:** MongoDB, PostgreSQL, MySQL, Firebase, Redis
**Cloud & DevOps:** AWS, Docker, Git, GitHub Actions, Vercel, CI/CD
**Tools:** VS Code, Figma, Postman, Jira

## WORK EXPERIENCE
1. **Full Stack Developer at ATTPL Group** (2023 - Present)
   - Building scalable web applications
   - Leading frontend development team
   - Implementing microservices architecture

2. **Frontend Developer at VitelMeet** (2022 - 2023)
   - Developed real-time video conferencing features
   - Built responsive UI components
   - Integrated WebRTC technologies

3. **Junior Developer at OmniGames** (2021 - 2022)
   - Created gaming platform interfaces
   - Optimized application performance
   - Collaborated with design team

## FEATURED PROJECTS
1. **E-Commerce Platform**
   - Full-stack Next.js application
   - Payment integration with Stripe
   - Admin dashboard with analytics

2. **Video Conferencing App (VitelMeet)**
   - Real-time video/audio communication
   - Screen sharing capabilities
   - Chat functionality

3. **ERP Management System (ATTPL)**
   - Enterprise resource planning
   - Multi-tenant architecture
   - Role-based access control

## WEBSITE NAVIGATION & URLS
Here are ALL the pages and sections users can visit:

### Main Pages:
1. **Homepage** → /
   - Hero section with introduction
   - About section
   - Experience timeline
   - Projects showcase
   - Skills display
   - Services offered
   - Testimonials
   - Contact section

2. **Projects Page** → /projects
   - Full showcase of all projects
   - Detailed project cards
   - Links to live demos and GitHub

3. **Contact Page** → /contact
   - Two options: Zoom Meeting OR Send Message
   - Default view shows both options

4. **Book Zoom Meeting** → /contact?view=booking
   - 4-step booking wizard
   - Select date and time
   - Fill your details
   - Get instant Zoom meeting link
   - Email confirmation sent to both parties

5. **Send Message** → /contact?view=message
   - Contact form (name, email, subject, message)
   - Email confirmation sent to both parties
   - Quick and easy communication

6. **Start a Project** → /start-project
   - Multi-step project inquiry wizard
   - Project type selection
   - Budget and timeline
   - Detailed requirements

### Section Anchors (on Homepage):
- About: /#about
- Experience: /#experience
- Projects: /#projects
- Skills: /#skills
- Services: /#services
- Testimonials: /#testimonials
- Contact: /#contact

## SERVICES OFFERED
1. **Web Development** - Custom websites and web applications
2. **Mobile App Development** - React Native cross-platform apps
3. **UI/UX Design** - Modern, user-friendly interfaces
4. **API Development** - RESTful and GraphQL APIs
5. **Cloud Solutions** - AWS, deployment, DevOps
6. **Consulting** - Technical guidance and architecture

## BOOKING INFORMATION
- **Available Days:** Monday to Saturday (Sunday closed)
- **Available Times:** 9:00 AM - 6:00 PM IST
- **Lunch Break:** 12:00 PM - 2:00 PM (unavailable)
- **Meeting Types:**
  - Discovery Call (15 min) - Quick introduction
  - Technical Discussion (30 min) - Deep dive
  - Consultation (60 min) - Detailed planning
  - Interview (30-60 min) - Job opportunities

## HOW TO HELP USERS
1. **Want to hire Naveen?** → Guide to /contact?view=booking or /start-project
2. **Want to see work?** → Guide to /projects or /#projects
3. **Want to know skills?** → Explain skills or guide to /#skills
4. **Want to contact?** → Guide to /contact?view=message or /contact?view=booking
5. **Want to know about experience?** → Explain experience or guide to /#experience
6. **General questions?** → Answer based on knowledge above

## RESPONSE GUIDELINES
1. Always be helpful, friendly, and professional
2. When mentioning URLs, format them as clickable: [Text](URL)
3. If user wants to book a meeting, provide: [Book a Zoom Meeting](/contact?view=booking)
4. If user wants to contact, provide: [Send a Message](/contact?view=message)
5. If user wants to start a project, provide: [Start a Project](/start-project)
6. Keep responses concise but informative
7. Use emojis sparingly for friendliness 😊
8. If you don't know something, say so honestly
9. Always try to guide users to relevant pages
10. For technical questions about Naveen's work, be detailed

## QUICK RESPONSES
- "How can I contact Naveen?" → Provide email, phone, and link to contact page
- "Is Naveen available for hire?" → Yes! Guide to booking or start project
- "What are Naveen's skills?" → List key skills with expertise levels
- "Show me projects" → Describe projects and link to projects page
- "Book a meeting" → Guide to /contact?view=booking with steps
- "What services?" → List all services offered

Remember: You represent Naveen professionally. Be helpful, accurate, and guide users effectively!`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build conversation history for context
    const conversationHistory = history.map((msg: ChatMessage) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Create the request body for Gemini
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand! I'm NavBot, Naveen Kandula's AI assistant. I'm ready to help visitors navigate the portfolio, answer questions about Naveen's skills and experience, and guide them to book meetings or start projects. How can I help you today? 😊",
            },
          ],
        },
        ...conversationHistory,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error response:", response.status, errorData);

      // Try fallback model if gemini-2.0-flash fails
      if (response.status === 404) {
        const fallbackUrl =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
        const fallbackResponse = await fetch(
          `${fallbackUrl}?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          const responseText =
            fallbackData.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I apologize, but I couldn't generate a response. Please try again!";
          return NextResponse.json({
            success: true,
            message: responseText,
          });
        }
      }

      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the response text
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I couldn't generate a response. Please try again!";

    return NextResponse.json({
      success: true,
      message: responseText,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process your message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
