import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Palette,
  GitBranch,
  Terminal,
  Boxes,
} from "lucide-react";

// Personal Information
export const personalInfo = {
  name: "Kandula Naveen",
  title: "Full Stack Developer",
  tagline: "Building Modern Web Applications with Passion & Precision",
  email: "kandulanaveennaidu017@gmail.com",
  phone: "+91 9705627977",
  location: "India",
  bio: "Passionate Full Stack Developer with 3+ years of experience in building scalable web applications. I specialize in React.js, Node.js, and modern web technologies, delivering high-quality solutions that drive business growth.",
  avatar: "/profile.jpg",
  resumeUrl: "/resume.pdf",
  website: "Naveen.org",
  socialLinks: {
    github: "https://github.com/Kandulanaveennaidu",
    linkedin: "https://www.linkedin.com/in/kandulanaveen1/",
    twitter: "https://x.com/Kandulanaveen8",
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Telugu", level: "Native" },
    { name: "Hindi", level: "Fluent" },
  ],
  interests: ["Open-Source Contributions"],
};

// Navigation Links
export const navLinks = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Experience", href: "experience" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Education", href: "education" },
  { name: "Services", href: "services" },
  { name: "Contact", href: "contact" },
];

// About Section Data
export const aboutData = {
  title: "About Me",
  subtitle: "Get to know me better",
  description: `I'm a dedicated Full Stack Developer with 3+ years of experience in creating elegant, efficient, and user-friendly web applications. I've had the privilege of working with diverse teams and technologies, constantly pushing the boundaries of what's possible in web development.

My journey in software development started with a curiosity about how things work on the internet. That curiosity evolved into a career where I now build applications that serve thousands of users daily. I believe in writing clean, maintainable code and following best practices to ensure the longevity and scalability of every project I work on.`,
  highlights: [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Happy Clients", value: "15+" },
    { label: "Technologies Mastered", value: "15+" },
  ],
};

// Experience Data
export const experienceData = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Vitelglobal Communication",
    location: "Hyderabad, India",
    period: "10/2024 – Present",
    description:
      "Architecting enterprise-grade applications using modern technologies, improving application performance and scalability.",
    responsibilities: [
      "Architect enterprise-grade applications using React.js, Redux, Node.js, MySQL, Docker, and AWS S3, improving application performance by 30% and scalability",
      "Develop responsive, cross-browser-compatible front-end interfaces with Bootstrap, enhancing user engagement by 40% through third-party API integrations",
      "Implement CI/CD pipelines with Docker, reducing deployment times by 60% and ensuring consistent development environments",
      "Optimize database queries and API endpoints, achieving 45% faster response times and increased throughput",
      "Collaborate with UX/UI designers using Figma to deliver pixel-perfect, responsive interfaces",
    ],
    technologies: [
      "React.js",
      "Redux",
      "Node.js",
      "MySQL",
      "Docker",
      "AWS S3",
      "Bootstrap",
      "Figma",
      "CI/CD",
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "ATTPL Group",
    location: "Ahmedabad, Gujarat, India",
    period: "12/2022 – 09/2024",
    description:
      "Led end-to-end development of web applications, boosting operational efficiency and delivering responsive interfaces.",
    responsibilities: [
      "Led end-to-end development of web applications using React.js, Node.js, and MySQL, boosting operational efficiency by 35%",
      "Designed responsive interfaces with Bootstrap and custom CSS, ensuring seamless functionality across desktop and mobile platforms",
      "Built RESTful APIs and optimized database performance, reducing page load times by 40%",
      "Participated in agile workflows, including sprint planning and daily stand-ups, consistently meeting project deadlines",
      "Created detailed documentation, reducing onboarding time for new developers by 50%",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "MySQL",
      "Bootstrap",
      "CSS",
      "RESTful APIs",
      "Agile",
    ],
  },
];

// Projects Data
export const projectsData = [
  {
    id: 1,
    title: "Omni-Channel Platform",
    description:
      "Developed a scalable platform integrating WhatsApp, SMS, and Telegram APIs, improving customer response times by 40%. Built responsive front-end with React.js and Redux, paired with a Node.js backend handling 100,000+ daily interactions.",
    image: "/projects/omni.png",
    category: "Full Stack",
    technologies: [
      "React.js",
      "Redux",
      "Node.js",
      "WhatsApp API",
      "SMS API",
      "Telegram API",
    ],
    liveUrl: "https://omnitest.vitelglobal.com/",
    featured: true,
  },
  {
    id: 2,
    title: "VitelMeet - Video Conference Platform",
    description:
      "Architected a WebRTC-based platform supporting 50,000+ concurrent users with 99.9% uptime and end-to-end encryption. Implemented real-time messaging and screen-sharing features, reducing latency by 25% through network optimization.",
    image: "/projects/vitelmeet.png",
    category: "Full Stack",
    technologies: [
      "React.js",
      "WebRTC",
      "Node.js",
      "Socket.io",
      "End-to-End Encryption",
    ],
    liveUrl: "https://vitelmeet.vitelglobal.com/",
    featured: true,
  },
  {
    id: 3,
    title: "Election Management System (EMS)",
    description:
      "Developed a secure platform for voter registration and result tabulation, handling 500,000+ voters with React.js and MySQL. Implemented Chart.js-based data visualizations, improving stakeholder analytics by 45%.",
    image: "/projects/attpl.png",
    category: "Full Stack",
    technologies: [
      "React.js",
      "MySQL",
      "Node.js",
      "Chart.js",
      "Data Visualization",
    ],
    liveUrl: "https://attplgroup.com/",
    featured: true,
  },
];

// Skills Data
export const skillsData = [
  {
    category: "Frontend",
    icon: Globe,
    skills: [
      { name: "React.js", level: 95 },
      { name: "Redux", level: 90 },
      { name: "Bootstrap", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Chart.js", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "RESTful APIs", level: 95 },
      { name: "WebRTC", level: 85 },
      { name: "Java", level: 70 },
      { name: ".NET", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS S3", level: 85 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 90 },
    ],
  },
  {
    category: "Tools",
    icon: Terminal,
    skills: [
      { name: "Figma", level: 80 },
      { name: "Postman", level: 90 },
      { name: "Jira", level: 85 },
      { name: "Agile Methodologies", level: 90 },
      { name: "GitHub Copilot", level: 85 },
      { name: "ChatGPT / Claude", level: 90 },
    ],
  },
  {
    category: "Key Skills",
    icon: Code2,
    skills: [
      { name: "Responsive Design", level: 95 },
      { name: "API Integration", level: 95 },
      { name: "Performance Optimization", level: 90 },
      { name: "Cross-Browser Compatibility", level: 90 },
    ],
  },
];

// Individual Technologies for display
export const technologiesList = [
  { name: "React.js", icon: Code2, color: "#61DAFB" },
  { name: "Redux", icon: Boxes, color: "#764ABC" },
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "JavaScript", icon: Code2, color: "#F7DF1E" },
  { name: "MySQL", icon: Database, color: "#4479A1" },
  { name: "MongoDB", icon: Database, color: "#47A248" },
  { name: "AWS S3", icon: Cloud, color: "#FF9900" },
  { name: "Docker", icon: Boxes, color: "#2496ED" },
  { name: "Bootstrap", icon: Palette, color: "#7952B3" },
  { name: "Git", icon: GitBranch, color: "#F05032" },
  { name: "WebRTC", icon: Globe, color: "#333333" },
  { name: "Chart.js", icon: Code2, color: "#FF6384" },
];

// Services Data
export const servicesData = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Custom web applications built with modern technologies like React, Next.js, and Node.js. From simple landing pages to complex enterprise applications.",
    icon: Globe,
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Tuning",
      "Accessibility Compliance",
    ],
  },
  {
    id: 2,
    title: "API Development",
    description:
      "Robust and scalable backend APIs using Node.js, Python, or GraphQL. Secure, well-documented, and built for performance.",
    icon: Server,
    features: [
      "RESTful APIs",
      "GraphQL APIs",
      "Authentication & Security",
      "Third-party Integrations",
    ],
  },
  {
    id: 3,
    title: "Database Design",
    description:
      "Efficient database architecture and optimization for your applications. Experience with both SQL and NoSQL databases.",
    icon: Database,
    features: [
      "Schema Design",
      "Query Optimization",
      "Data Migration",
      "Backup Solutions",
    ],
  },
  {
    id: 4,
    title: "Cloud Solutions",
    description:
      "Deploy and scale your applications on AWS, GCP, or Azure. Infrastructure as code and DevOps best practices.",
    icon: Cloud,
    features: [
      "Cloud Architecture",
      "CI/CD Pipelines",
      "Container Orchestration",
      "Monitoring & Logging",
    ],
  },
  {
    id: 5,
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications using React Native. Native-like performance with shared codebase.",
    icon: Smartphone,
    features: [
      "iOS & Android Apps",
      "Push Notifications",
      "Offline Support",
      "App Store Deployment",
    ],
  },
  {
    id: 6,
    title: "UI/UX Consultation",
    description:
      "Design consultation and implementation of user-friendly interfaces. Focus on user experience and conversion optimization.",
    icon: Palette,
    features: [
      "Design Systems",
      "Prototyping",
      "User Testing",
      "Brand Consistency",
    ],
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content:
      "Naveen delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire project smooth and successful.",
    avatar: "/testimonials/avatar1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateTech",
    content:
      "Working with Naveen was a pleasure. He understood our requirements perfectly and delivered a scalable solution that has helped us grow our user base significantly.",
    avatar: "/testimonials/avatar2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "DesignCraft Studio",
    content:
      "Naveen's full-stack expertise is remarkable. He built our entire platform from scratch, and his code quality and documentation are top-notch.",
    avatar: "/testimonials/avatar3.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO",
    company: "DataFlow Systems",
    content:
      "I've worked with many developers, but Naveen stands out for his problem-solving skills and commitment to delivering quality work on time.",
    avatar: "/testimonials/avatar4.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Marketing Director",
    company: "GrowthHub",
    content:
      "Naveen transformed our outdated website into a modern, fast, and user-friendly platform. Our conversion rates have improved by 40% since the launch.",
    avatar: "/testimonials/avatar5.jpg",
    rating: 5,
  },
];

// Project Categories for filtering
export const projectCategories = ["All", "Full Stack"];

// Education Data
export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Commerce",
    field: "Accounting and Finance",
    institution: "Osmania University",
    location: "Hyderabad, Telangana",
    period: "06/2019 - 05/2023",
  },
];

// Certifications Data
export const certificationsData = [
  {
    id: 1,
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    icon: "🏆",
  },
  {
    id: 2,
    name: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    icon: "🏆",
  },
  {
    id: 3,
    name: "Full Stack Web Development",
    issuer: "Newton School",
    icon: "🎓",
  },
  {
    id: 4,
    name: "Data Visualization",
    issuer: "freeCodeCamp",
    icon: "📊",
  },
];
