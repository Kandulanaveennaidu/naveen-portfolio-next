"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/data";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks";

export function Services() {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="services" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeInUp className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            What I Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services & Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive development services to help bring your ideas to life
          </p>
        </FadeInUp>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Section */}
        <FadeInUp delay={0.4} className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-border">
            <h3 className="text-2xl font-bold mb-4">Have a project in mind?</h3>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss how I can help you achieve your goals with
              custom solutions tailored to your needs.
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90"
            >
              Start a Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: (typeof servicesData)[0] }) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
      <Card className="h-full group border-border hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-purple-500 transition-all duration-300"
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
          </motion.div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={feature}
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: featureIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
