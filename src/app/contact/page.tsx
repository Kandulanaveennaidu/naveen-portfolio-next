"use client";

import { useState, useMemo, Suspense, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Video,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// Time slots available for booking (IST - Indian Standard Time)
const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "12:30 PM", available: false },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "05:30 PM", available: true },
  { time: "06:00 PM", available: true },
];

// Meeting duration options
const durationOptions = [
  { value: 15, label: "15 min", description: "Quick chat" },
  { value: 30, label: "30 min", description: "Discovery call" },
  { value: 60, label: "60 min", description: "In-depth discussion" },
];

// Meeting type options
const meetingTypes = [
  {
    id: "discovery",
    label: "Discovery Call",
    icon: "💡",
    description: "Learn about your project requirements",
  },
  {
    id: "technical",
    label: "Technical Discussion",
    icon: "⚙️",
    description: "Deep dive into technical solutions",
  },
  {
    id: "consultation",
    label: "Free Consultation",
    icon: "🎯",
    description: "Get expert advice on your project",
  },
  {
    id: "interview",
    label: "Interview",
    icon: "👔",
    description: "Job opportunity discussion",
  },
];

function ContactPageContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  // States for Zoom booking
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedMeetingType, setSelectedMeetingType] = useState<string | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState<{
    id: number;
    joinUrl: string;
    password: string;
    topic: string;
    startTime: string;
    duration: number;
  } | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    agenda: "",
  });

  // Booked slots tracking
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // States for contact form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentMonth]);

  // Fetch booked slots for the current month
  const fetchBookedSlots = useCallback(async () => {
    setIsLoadingSlots(true);
    try {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const startDate = new Date(year, month, 1).toISOString().split("T")[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

      const response = await fetch(
        `/api/bookings?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      if (data.success) {
        setBookedSlots(data.bookedSlots);
      }
    } catch (error) {
      console.error("Failed to fetch booked slots:", error);
    } finally {
      setIsLoadingSlots(false);
    }
  }, [currentMonth]);

  // Fetch booked slots when month changes
  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  // Check if a time slot is booked for selected date
  const isTimeSlotBooked = (time: string): boolean => {
    if (!selectedDate) return false;
    const dateKey = selectedDate.toISOString().split("T")[0];
    return bookedSlots[dateKey]?.includes(time) || false;
  };

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return date >= today && day !== 0;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookingFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async () => {
    setIsBookingSubmitting(true);
    setBookingError(null);

    try {
      const response = await fetch("/api/zoom/create-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingFormData.name,
          email: bookingFormData.email,
          company: bookingFormData.company,
          phone: bookingFormData.phone,
          agenda: bookingFormData.agenda,
          meetingType: selectedMeetingType,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          duration: selectedDuration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if slot was taken by someone else
        if (data.slotTaken) {
          // Refresh the booked slots
          await fetchBookedSlots();
          setSelectedTime(null);
          setBookingStep(3); // Go back to time selection
        }
        throw new Error(data.error || "Failed to create meeting");
      }

      // Refresh booked slots after successful booking
      await fetchBookedSlots();

      setMeetingDetails(data.meeting);
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Error creating meeting:", error);
      setBookingError(
        error instanceof Error
          ? error.message
          : "Failed to create meeting. Please try again."
      );
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDuration(30);
    setSelectedMeetingType(null);
    setBookingConfirmed(false);
    setMeetingDetails(null);
    setBookingError(null);
    setBookingFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      agenda: "",
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const socialLinks = [
    { icon: Github, name: "GitHub", href: personalInfo.socialLinks.github },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: personalInfo.socialLinks.linkedin,
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      href: personalInfo.socialLinks.twitter,
    },
  ];

  // Zoom Booking View
  if (view === "zoom") {
    return (
      <main className="min-h-screen bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/#contact">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              <Video className="w-4 h-4" />
              Zoom Meeting
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book a Meeting
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Schedule a free video call to discuss your project requirements
            </p>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-blue-500/20 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

              {/* Progress Steps */}
              {!bookingConfirmed && (
                <div className="flex items-center justify-center gap-2 p-6 border-b border-border">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          step === bookingStep
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : step < bookingStep
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                        animate={{ scale: step === bookingStep ? 1.1 : 1 }}
                      >
                        {step < bookingStep ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          step
                        )}
                      </motion.div>
                      {step < 4 && (
                        <div
                          className={`w-16 h-1 mx-2 rounded ${
                            step < bookingStep ? "bg-green-500" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {bookingConfirmed ? (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">
                        Meeting Scheduled!
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Your Zoom meeting has been created successfully.
                      </p>

                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 max-w-md mx-auto mb-6 text-left">
                        <div className="flex items-center gap-2 mb-4">
                          <Video className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold">Meeting Details</span>
                        </div>
                        <div className="space-y-3 text-sm">
                          {meetingDetails && (
                            <>
                              <div className="flex justify-between py-2 border-b border-border">
                                <span className="text-muted-foreground">
                                  Meeting ID
                                </span>
                                <span className="font-mono font-medium">
                                  {meetingDetails.id}
                                </span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-border">
                                <span className="text-muted-foreground">
                                  Password
                                </span>
                                <span className="font-mono font-medium">
                                  {meetingDetails.password}
                                </span>
                              </div>
                            </>
                          )}
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">
                              {selectedDate && formatDate(selectedDate)}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">Time</span>
                            <span className="font-medium">
                              {selectedTime} IST
                            </span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">
                              Duration
                            </span>
                            <span className="font-medium">
                              {selectedDuration} minutes
                            </span>
                          </div>
                        </div>
                      </div>

                      {meetingDetails?.joinUrl && (
                        <a
                          href={meetingDetails.joinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mb-4"
                        >
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-600"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Join Zoom Meeting
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      )}

                      <p className="text-sm text-muted-foreground mb-4">
                        A calendar invite has been sent to{" "}
                        <span className="font-medium">
                          {bookingFormData.email}
                        </span>
                      </p>

                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetBooking}>
                          Book Another
                        </Button>
                        <Link href="/">
                          <Button variant="ghost">Back to Home</Button>
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* Step 1: Meeting Type */}
                      {bookingStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl font-semibold mb-6">
                            What would you like to discuss?
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {meetingTypes.map((type) => (
                              <motion.div
                                key={type.id}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedMeetingType === type.id
                                    ? "border-blue-500 bg-blue-500/5"
                                    : "border-border hover:border-blue-500/50"
                                }`}
                                onClick={() => setSelectedMeetingType(type.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-3xl mb-2">{type.icon}</div>
                                <h4 className="font-semibold">{type.label}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {type.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>

                          <h3 className="text-xl font-semibold mb-4">
                            Select Duration
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {durationOptions.map((option) => (
                              <motion.button
                                key={option.value}
                                className={`px-6 py-3 rounded-xl border-2 transition-all ${
                                  selectedDuration === option.value
                                    ? "border-blue-500 bg-blue-500/5"
                                    : "border-border hover:border-blue-500/50"
                                }`}
                                onClick={() =>
                                  setSelectedDuration(option.value)
                                }
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="font-semibold">
                                  {option.label}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {option.description}
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Select Date */}
                      {bookingStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl font-semibold mb-6">
                            Select a Date
                          </h3>

                          <div className="flex items-center justify-between mb-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setCurrentMonth(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() - 1
                                  )
                                )
                              }
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <h4 className="font-semibold text-lg">
                              {currentMonth.toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setCurrentMonth(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() + 1
                                  )
                                )
                              }
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-4">
                            {weekDays.map((day) => (
                              <div
                                key={day}
                                className="text-center text-sm font-medium text-muted-foreground py-2"
                              >
                                {day}
                              </div>
                            ))}
                            {calendarDays.map((date, index) => (
                              <motion.button
                                key={index}
                                className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                                  !date
                                    ? "invisible"
                                    : !isDateAvailable(date)
                                    ? "text-muted-foreground/40 cursor-not-allowed"
                                    : selectedDate?.toDateString() ===
                                      date.toDateString()
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                                    : "hover:bg-muted"
                                }`}
                                onClick={() => {
                                  if (date && isDateAvailable(date)) {
                                    setSelectedDate(date);
                                    setSelectedTime(null); // Clear selected time when date changes
                                  }
                                }}
                                disabled={!date || !isDateAvailable(date)}
                                whileHover={
                                  date && isDateAvailable(date)
                                    ? { scale: 1.1 }
                                    : {}
                                }
                              >
                                {date?.getDate()}
                              </motion.button>
                            ))}
                          </div>

                          {selectedDate && (
                            <div className="bg-muted/50 rounded-xl p-4 text-center">
                              <p className="text-sm text-muted-foreground">
                                Selected Date
                              </p>
                              <p className="font-semibold">
                                {formatDate(selectedDate)}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Step 3: Select Time */}
                      {bookingStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl font-semibold mb-2">
                            Select a Time
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6">
                            {selectedDate && formatDate(selectedDate)} • All
                            times are in IST
                            {isLoadingSlots && (
                              <span className="ml-2 inline-flex items-center">
                                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                Loading...
                              </span>
                            )}
                          </p>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {timeSlots.map((slot) => {
                              const isBooked = isTimeSlotBooked(slot.time);
                              const isAvailable = slot.available && !isBooked;

                              return (
                                <motion.button
                                  key={slot.time}
                                  className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all relative ${
                                    !isAvailable
                                      ? "border-border bg-muted/30 text-muted-foreground/50 cursor-not-allowed"
                                      : selectedTime === slot.time
                                      ? "border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                      : "border-border hover:border-blue-500/50"
                                  }`}
                                  onClick={() =>
                                    isAvailable && setSelectedTime(slot.time)
                                  }
                                  disabled={!isAvailable}
                                  whileHover={
                                    isAvailable ? { scale: 1.05 } : {}
                                  }
                                >
                                  {slot.time}
                                  {isBooked && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                      Booked
                                    </span>
                                  )}
                                  {!slot.available && !isBooked && (
                                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                      Break
                                    </span>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Your Details */}
                      {bookingStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl font-semibold mb-6">
                            Your Details
                          </h3>

                          <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  Your Name *
                                </label>
                                <Input
                                  name="name"
                                  placeholder="John Doe"
                                  value={bookingFormData.name}
                                  onChange={handleBookingChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  Email Address *
                                </label>
                                <Input
                                  name="email"
                                  type="email"
                                  placeholder="john@example.com"
                                  value={bookingFormData.email}
                                  onChange={handleBookingChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <Building className="w-4 h-4" />
                                  Company
                                </label>
                                <Input
                                  name="company"
                                  placeholder="Your Company"
                                  value={bookingFormData.company}
                                  onChange={handleBookingChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  Phone Number
                                </label>
                                <Input
                                  name="phone"
                                  type="tel"
                                  placeholder="+91 98765 43210"
                                  value={bookingFormData.phone}
                                  onChange={handleBookingChange}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Meeting Agenda
                              </label>
                              <Textarea
                                name="agenda"
                                placeholder="Brief description of what you'd like to discuss..."
                                value={bookingFormData.agenda}
                                onChange={handleBookingChange}
                                rows={4}
                                className="resize-none"
                              />
                            </div>

                            {/* Summary */}
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 mt-6">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Video className="w-4 h-4 text-blue-500" />
                                Meeting Summary
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Type
                                  </span>
                                  <span className="font-medium">
                                    {
                                      meetingTypes.find(
                                        (t) => t.id === selectedMeetingType
                                      )?.label
                                    }
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Date
                                  </span>
                                  <span className="font-medium">
                                    {selectedDate && formatDate(selectedDate)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Time
                                  </span>
                                  <span className="font-medium">
                                    {selectedTime} IST
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Duration
                                  </span>
                                  <span className="font-medium">
                                    {selectedDuration} minutes
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                {!bookingConfirmed && (
                  <div className="mt-8 pt-6 border-t border-border">
                    {bookingError && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{bookingError}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setBookingStep(Math.max(1, bookingStep - 1))
                        }
                        disabled={bookingStep === 1 || isBookingSubmitting}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>

                      {bookingStep < 4 ? (
                        <Button
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                          onClick={() => setBookingStep(bookingStep + 1)}
                          disabled={
                            (bookingStep === 1 && !selectedMeetingType) ||
                            (bookingStep === 2 && !selectedDate) ||
                            (bookingStep === 3 && !selectedTime)
                          }
                        >
                          Continue
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                          onClick={handleBookingSubmit}
                          disabled={
                            isBookingSubmitting ||
                            !bookingFormData.name ||
                            !bookingFormData.email
                          }
                        >
                          {isBookingSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Creating Meeting...
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4 mr-2" />
                              Confirm Booking
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    );
  }

  // Message/Contact Form View
  if (view === "message") {
    return (
      <main className="min-h-screen bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/#contact">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <MessageSquare className="w-4 h-4" />
              Send a Message
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a question or want to work together? Drop me a message!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. I&apos;ll get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Your Name *
                          </label>
                          <Input
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Company</label>
                          <Input
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Subject *
                          </label>
                          <Input
                            name="subject"
                            placeholder="How can I help you?"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message *</label>
                        <Textarea
                          name="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Availability */}
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Available for Work
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 hours.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Contact Details</h3>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <span>{personalInfo.email}</span>
                  </a>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <span>{personalInfo.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-500" />
                    </div>
                    <span>{personalInfo.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Connect with Me</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-muted hover:bg-primary hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  // Default View - Selection Page
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-8 left-8"
        >
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How would you like to connect?
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your preferred way to get in touch
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Zoom Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/contact?view=zoom">
              <Card className="h-full border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <CardContent className="p-10 text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 5 }}
                  >
                    <Video className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 mb-2">
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
                  </p>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                    size="lg"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Send Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact?view=message">
              <Card className="h-full border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-10 text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: -5 }}
                  >
                    <MessageSquare className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                  <p className="text-muted-foreground mb-6">
                    Fill out the contact form and I&apos;ll respond within 24
                    hours
                  </p>
                  <Button
                    className="bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                    size="lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let&apos;s Connect
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
