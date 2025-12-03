"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  Hero,
  About,
  Experience,
  Projects,
  Skills,
  Education,
  Services,
  Testimonials,
  Contact,
  Footer,
} from "@/components/sections";
import { LoadingScreen } from "@/components/ui/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <motion.main
        className="relative min-h-screen bg-background text-foreground overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Sections */}
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />

        {/* Cursor Glow Effect */}
        <CursorGlow />
      </motion.main>
    </>
  );
}

// Cursor Glow Effect Component
function CursorGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(120, 119, 198, 0.06), transparent 40%)",
      }}
      onMouseMove={(e) => {
        const target = e.currentTarget;
        target.style.setProperty("--mouse-x", `${e.clientX}px`);
        target.style.setProperty("--mouse-y", `${e.clientY}px`);
      }}
    />
  );
}
