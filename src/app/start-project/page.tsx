"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  CheckCircle2,
  Loader2,
  Globe,
  Smartphone,
  Server,
  Database,
  Palette,
  ShoppingCart,
  MessageSquare,
  Video,
  BarChart3,
  Shield,
  Zap,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Send,
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projectTypes = [
  {
    id: "web-app",
    icon: Globe,
    title: "Web Application",
    description: "Full-stack web apps with modern frameworks",
    popular: true,
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile App",
    description: "Cross-platform mobile applications",
    popular: false,
  },
  {
    id: "api",
    icon: Server,
    title: "API Development",
    description: "RESTful APIs and backend services",
    popular: false,
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online stores and payment integration",
    popular: true,
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Dashboard/Admin",
    description: "Analytics and admin panels",
    popular: false,
  },
  {
    id: "realtime",
    icon: Video,
    title: "Real-time App",
    description: "Chat, video calls, live features",
    popular: false,
  },
  {
    id: "database",
    icon: Database,
    title: "Database Design",
    description: "Schema design and optimization",
    popular: false,
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    description: "User interface and experience design",
    popular: false,
  },
];

const budgetRanges = [
  { id: "starter", label: "$1K - $5K", description: "Small projects, MVPs" },
  {
    id: "growth",
    label: "$5K - $15K",
    description: "Medium-scale applications",
  },
  {
    id: "professional",
    label: "$15K - $30K",
    description: "Enterprise solutions",
  },
  { id: "enterprise", label: "$30K+", description: "Large-scale platforms" },
  { id: "discuss", label: "Let's Discuss", description: "Flexible budget" },
];

const timelines = [
  { id: "urgent", label: "Less than 1 month", icon: Zap },
  { id: "standard", label: "1-3 months", icon: Clock },
  { id: "relaxed", label: "3-6 months", icon: Calendar },
  { id: "flexible", label: "Flexible", icon: FileText },
];

const features = [
  { id: "auth", label: "User Authentication", icon: Shield },
  { id: "payments", label: "Payment Integration", icon: DollarSign },
  { id: "realtime", label: "Real-time Features", icon: Zap },
  { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
  { id: "notifications", label: "Push Notifications", icon: MessageSquare },
  { id: "api", label: "Third-party APIs", icon: Server },
  { id: "responsive", label: "Responsive Design", icon: Smartphone },
  { id: "seo", label: "SEO Optimization", icon: Globe },
];

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    features: [] as string[],
    name: "",
    email: "",
    company: "",
    phone: "",
    projectName: "",
    description: "",
    existingWebsite: "",
    additionalInfo: "",
  });

  const totalSteps = 4;

  const handleProjectTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleTimelineSelect = (timeline: string) => {
    setFormData((prev) => ({ ...prev, timeline }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit project inquiry");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting project inquiry:", error);
      alert("Failed to submit your project request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType !== "";
      case 2:
        return formData.budget !== "" && formData.timeline !== "";
      case 3:
        return formData.features.length > 0;
      case 4:
        return (
          formData.name !== "" &&
          formData.email !== "" &&
          formData.description !== ""
        );
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">
            Project Request Submitted!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest! I&apos;ve received your project details
            and will review them carefully. Expect a response within 24-48 hours
            with a detailed proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              >
                View My Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="font-semibold">Start a Project</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  animate={{ scale: s === step ? 1.1 : 1 }}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </motion.div>
                {s < 4 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      s < step ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-3xl mx-auto text-xs text-muted-foreground">
            <span>Project Type</span>
            <span>Budget & Timeline</span>
            <span>Features</span>
            <span>Your Details</span>
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="mb-4">Step 1 of 4</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    What type of project do you need?
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Select the category that best describes your project. This
                    helps me understand your needs better.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projectTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 h-full ${
                          formData.projectType === type.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleProjectTypeSelect(type.id)}
                      >
                        <CardContent className="p-6 text-center relative">
                          {type.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-orange-500">
                              Popular
                            </Badge>
                          )}
                          <motion.div
                            className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                              formData.projectType === type.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                            animate={{
                              scale: formData.projectType === type.id ? 1.1 : 1,
                            }}
                          >
                            <type.icon className="w-7 h-7" />
                          </motion.div>
                          <h3 className="font-semibold mb-1">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="mb-4">Step 2 of 4</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Budget & Timeline
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Help me understand your investment range and timeline
                    expectations.
                  </p>
                </div>

                {/* Budget */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Project Budget
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {budgetRanges.map((budget) => (
                      <motion.div
                        key={budget.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${
                            formData.budget === budget.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleBudgetSelect(budget.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <p className="font-semibold text-lg">
                              {budget.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {budget.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Expected Timeline
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {timelines.map((timeline) => (
                      <motion.div
                        key={timeline.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${
                            formData.timeline === timeline.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleTimelineSelect(timeline.id)}
                        >
                          <CardContent className="p-4 flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                formData.timeline === timeline.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <timeline.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">
                              {timeline.label}
                            </span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Features */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="mb-4">Step 3 of 4</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Key Features Needed
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Select all the features you need for your project. This
                    helps me provide an accurate estimate.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.features.includes(feature.id)
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              formData.features.includes(feature.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{feature.label}</span>
                          {formData.features.includes(feature.id) && (
                            <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Selected: {formData.features.length} feature(s)
                </p>
              </motion.div>
            )}

            {/* Step 4: Your Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="mb-4">Step 4 of 4</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Tell Me About Yourself
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Almost there! Share your contact details and project
                    description.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  <Card>
                    <CardContent className="p-6 md:p-8 space-y-6">
                      {/* Contact Info */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Your Name *
                          </label>
                          <Input
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Address *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Company/Organization
                          </label>
                          <Input
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="+1 234 567 890"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Project Name
                        </label>
                        <Input
                          name="projectName"
                          placeholder="My Awesome Project"
                          value={formData.projectName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Project Description *
                        </label>
                        <Textarea
                          name="description"
                          placeholder="Describe your project, goals, target audience, and any specific requirements..."
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={5}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Existing Website (if any)
                        </label>
                        <Input
                          name="existingWebsite"
                          placeholder="https://yourwebsite.com"
                          value={formData.existingWebsite}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Additional Information
                        </label>
                        <Textarea
                          name="additionalInfo"
                          placeholder="Any other details, inspiration links, or references..."
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-12 max-w-2xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {step < totalSteps ? (
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="gap-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Project Request
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Summary */}
          {step > 1 && (
            <motion.div
              className="mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-3">Your Selections:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.projectType && (
                      <Badge variant="secondary">
                        {
                          projectTypes.find(
                            (t) => t.id === formData.projectType
                          )?.title
                        }
                      </Badge>
                    )}
                    {formData.budget && (
                      <Badge variant="secondary">
                        {
                          budgetRanges.find((b) => b.id === formData.budget)
                            ?.label
                        }
                      </Badge>
                    )}
                    {formData.timeline && (
                      <Badge variant="secondary">
                        {
                          timelines.find((t) => t.id === formData.timeline)
                            ?.label
                        }
                      </Badge>
                    )}
                    {formData.features.map((f) => (
                      <Badge key={f} variant="outline">
                        {features.find((feat) => feat.id === f)?.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Contact */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Prefer to talk directly?
            </span>
            <div className="flex gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-primary hover:underline"
              >
                {personalInfo.email}
              </a>
              <span className="text-muted-foreground">or</span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="text-primary hover:underline"
              >
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
