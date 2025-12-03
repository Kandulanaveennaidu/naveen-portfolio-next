import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Chatbot from "@/components/chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naveen Kandula | Full Stack Developer",
  description:
    "Passionate Full Stack Developer specializing in React, Node.js, and cloud technologies. Building modern, scalable web applications with precision and creativity.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Naveen Kandula" }],
  creator: "Naveen Kandula",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naveenkandula.dev",
    title: "Naveen Kandula | Full Stack Developer",
    description:
      "Passionate Full Stack Developer specializing in React, Node.js, and cloud technologies.",
    siteName: "Naveen Kandula Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen Kandula | Full Stack Developer",
    description:
      "Passionate Full Stack Developer specializing in React, Node.js, and cloud technologies.",
    creator: "@naveenkandula",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
