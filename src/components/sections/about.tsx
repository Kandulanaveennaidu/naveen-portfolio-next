"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { aboutData } from "@/lib/data";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";

export function About() {
  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeInUp className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {aboutData.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {aboutData.subtitle}
          </p>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <FadeInLeft>
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main Image Container */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 relative">
                  {/* Profile Image */}
                  <Image
                    src="/profile.jpg"
                    alt="Kandula Naveen"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover relative z-10"
                    priority
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-2xl -z-10"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full -z-10"
                animate={{
                  rotate: [0, -10, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Experience Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 md:bottom-6 md:right-6 bg-background border border-border rounded-2xl p-4 shadow-xl z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3+</p>
                    <p className="text-sm text-muted-foreground">
                      Years Experience
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInLeft>

          {/* Content Section */}
          <FadeInRight>
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert">
                {aboutData.description.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-4 mt-8">
                {aboutData.highlights.map((highlight, index) => (
                  <StaggerItem key={highlight.label}>
                    <motion.div
                      className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors group"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <motion.p
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                        }}
                        viewport={{ once: true }}
                      >
                        {highlight.value}
                      </motion.p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {highlight.label}
                      </p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
