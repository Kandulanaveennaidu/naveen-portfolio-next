"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, Heart } from "lucide-react";
import { educationData, certificationsData, personalInfo } from "@/lib/data";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section
      id="education"
      className="py-12 md:py-20 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeInUp className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Education & More
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Education & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications
          </p>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <FadeInUp delay={0.1}>
            <div className="bg-background rounded-2xl p-6 border border-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>

              {educationData.map((edu) => (
                <motion.div
                  key={edu.id}
                  className="p-4 rounded-xl bg-muted/50 border border-border"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold text-lg">{edu.degree}</h4>
                  <p className="text-primary font-medium">{edu.field}</p>
                  <p className="text-muted-foreground mt-2">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.location}
                  </p>
                  <Badge variant="outline" className="mt-3">
                    {edu.period}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </FadeInUp>

          {/* Certifications */}
          <FadeInUp delay={0.2}>
            <div className="bg-background rounded-2xl p-6 border border-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>

              <StaggerContainer className="space-y-3">
                {certificationsData.map((cert) => (
                  <StaggerItem key={cert.id}>
                    <motion.div
                      className="p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-3"
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeInUp>
        </div>

        {/* Languages & Interests */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Languages */}
          <FadeInUp delay={0.3}>
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Languages</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {personalInfo.languages?.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    className="px-4 py-2 rounded-full bg-muted/50 border border-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground ml-2">
                      ({lang.level})
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Interests */}
          <FadeInUp delay={0.4}>
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Interests</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {personalInfo.interests?.map((interest, index) => (
                  <motion.div
                    key={interest}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-medium text-primary">{interest}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
