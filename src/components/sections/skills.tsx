"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData, technologiesList } from "@/lib/data";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Skills() {
  return (
    <section
      id="skills"
      className="py-12 md:py-20 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeInUp className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </FadeInUp>

        {/* Technologies Marquee */}
        <FadeInUp delay={0.2} className="mb-10 overflow-hidden">
          <div className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[
                ...technologiesList,
                ...technologiesList,
                ...technologiesList,
              ].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border whitespace-nowrap"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <tech.icon
                    className="w-5 h-5"
                    style={{ color: tech.color }}
                  />
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FadeInUp>

        {/* Skills Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, categoryIndex) => (
            <StaggerItem key={category.category}>
              <SkillCard category={category} index={categoryIndex} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Skill Card Component
function SkillCard({
  category,
  index,
}: {
  category: (typeof skillsData)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div ref={ref} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:from-primary group-hover:to-purple-500 transition-all duration-300"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <category.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </motion.div>
            <CardTitle className="text-lg">{category.category}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <motion.span
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: skillIndex * 0.1 + 0.5 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    isInView ? { width: `${skill.level}%` } : { width: 0 }
                  }
                  transition={{
                    duration: 1,
                    delay: skillIndex * 0.1 + index * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
