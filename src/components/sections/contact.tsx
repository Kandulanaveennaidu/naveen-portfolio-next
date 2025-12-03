"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Video,
  ArrowRight,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import { FadeInUp } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "#",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeInUp className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you!
          </p>
        </FadeInUp>

        {/* Main CTA Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Zoom Meeting Card - Primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/contact?view=zoom" className="block h-full">
              <Card className="h-full border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <Video className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      Recommended
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    Book a Zoom Meeting
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule a free video call to discuss your project
                    requirements, get expert advice, or explore opportunities.
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>15-60 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Mon-Sat</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 shadow-lg group-hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Meeting
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Get in Touch Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/contact?view=message" className="block h-full">
              <Card className="h-full border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -5 }}
                  >
                    <MessageSquare className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                  <p className="text-muted-foreground mb-6">
                    Have questions or want to discuss a project? Fill out the
                    contact form and I&apos;ll get back to you within 24 hours.
                  </p>

                  {/* Availability Badge */}
                  <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-green-500/10 rounded-lg w-fit">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Available for new projects
                    </span>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 shadow-lg group-hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let&apos;s Connect
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Quick Contact Info */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-muted/50 hover:bg-muted transition-colors group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center`}
              >
                <info.icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium group-hover:text-primary transition-colors">
                {info.value}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
