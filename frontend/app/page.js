"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentCheckIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Carousel from "@/components/Carousel";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import Testimonials from "@/components/Testimonials";
import PartnersSection from "@/components/ParternsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);


  // Toggle function
  const toggleFAQ = (index) => {

    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };



  const features = [
    {
      icon: AcademicCapIcon,
      title: "Advanced Test Creation",
      description:
        "Customizable exams with banks, time limits, and multiple formats.",
    },
    {
      icon: CheckBadgeIcon,
      title: "Automated Assessment",
      description: "Instant grading, flexible marking, and quick feedback.",
    },
    {
      icon: ChartBarIcon,
      title: "Performance Analytics",
      description: "Track results with reports, monitoring, and trends.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Environment",
      description: "IP restrictions, monitoring, randomization, and logs.",
    },
    {
      icon: CalendarDaysIcon,
      title: "Schedule Management",
      description: "Smart scheduling with conflict detection and alerts.",
    },
    {
      icon: UserGroupIcon,
      title: "Role-Based Access",
      description: "Control permissions for admins, teachers, and students.",
    },
  ];

  const stats = [
    { number: 50000, label: "Active Students" },
    { number: 1200, label: "Institutions" },
    { number: 99.9, label: "System Uptime" },
    { number: 24, label: "Support Hours" },
  ];

  const faqs = [
    {
      question: "Is the platform secure?",
      answer: "Yes, with IP restrictions, monitoring, and randomization.",
    },
    {
      question: "Can I integrate with LMS?",
      answer: "Absolutely, we support popular LMS and analytics tools.",
    },
    {
      question: "Do students get instant results?",
      answer: "Yes, grading and feedback are instant.",
    },
    {
      question: "Is support available?"
      , answer: "We provide 24/7 support."
    },
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-100 text-sm">


      <Carousel />



      {/* Hero */}
      <section className="bg-primary dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 border-b border-transparent dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full mb-4 border dark:border-blue-800">
                Trusted by 1,200+ Institutions
              </span>
              <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-50">
                School{" "}
                <span className="text-blue-800 dark:text-blue-400">
                  Mock Test System
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Streamline assessments with our secure, scalable, and
                intelligent platform. Attempt tests, view instant results, and
                access detailed performance reports with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button className="bg-blue-800 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg dark:shadow-blue-900/20">
                  Access Login Portal
                </button>
                <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg text-sm font-medium shadow-lg dark:shadow-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Request Demo
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 dark:border-gray-700 pt-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-blue-50 dark:bg-gray-800/50 rounded-lg p-4 text-center shadow-sm dark:shadow-gray-900/20 border dark:border-gray-700"
                  >
                    <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                      <CountUp
                        end={stat.number}
                        duration={2}
                        separator=","
                        suffix={
                          stat.label === "System Uptime"
                            ? "%"
                            : stat.label === "Support Hours"
                              ? "/7"
                              : "+"
                        }
                      />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/student.png"
                alt="Mock Test Illustration"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>


      {/* Flowchart */}
      <section className="py-8 px-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden border-b border-transparent dark:border-gray-700">

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50 mb-12 tracking-wide">
            How It Works
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Step 1 */}
            <div className="group flex flex-col items-center">
              <div className="relative w-40 h-40 bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md dark:group-hover:shadow-gray-900/30 flex flex-col items-center justify-center text-center backdrop-blur-sm dark:backdrop-blur-md">
                <div className="absolute -top-3 -left-3 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg dark:shadow-blue-900/50">
                  1
                </div>
                <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-3" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Attempt Test
                </span>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex flex-col items-center">
              <ArrowLongRightIcon className="hidden sm:block h-6 w-6 text-blue-500 dark:text-blue-400" />
              <ChevronDownIcon className="block sm:hidden h-6 w-6 text-blue-500 dark:text-blue-400 mt-2" />
            </div>

            {/* Step 2 */}
            <div className="group flex flex-col items-center">
              <div className="relative w-40 h-40 bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md dark:group-hover:shadow-gray-900/30 flex flex-col items-center justify-center text-center backdrop-blur-sm dark:backdrop-blur-md">
                <div className="absolute -top-3 -left-3 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg dark:shadow-blue-900/50">
                  2
                </div>
                <ChartBarIcon className="h-8 w-8 text-green-500 dark:text-green-400 mb-3" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  View Instant Results
                </span>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex flex-col items-center">
              <ArrowLongRightIcon className="hidden sm:block h-6 w-6 text-blue-500 dark:text-blue-400" />
              <ChevronDownIcon className="block sm:hidden h-6 w-6 text-blue-500 dark:text-blue-400 mt-2" />
            </div>

            {/* Step 3 */}
            <div className="group flex flex-col items-center">
              <div className="relative w-40 h-40 bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md dark:group-hover:shadow-gray-900/30 flex flex-col items-center justify-center text-center backdrop-blur-sm dark:backdrop-blur-md">
                <div className="absolute -top-3 -left-3 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg dark:shadow-blue-900/50">
                  3
                </div>
                <DocumentTextIcon className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-3" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Access Detailed Report
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Complete your test, instantly review your scores, and analyze a comprehensive report—designed
            to give you the insights you need to excel.
          </p>
        </div>
      </section>


      {/* Why */}
      <section className="py-10 px-4 bg-white dark:bg-gray-900 border-b border-transparent dark:border-gray-700">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
            Why School Mock Test System?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Schools need efficient and reliable assessments. Our system
            streamlines testing, improves analytics, and saves teachers valuable
            time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Time-Saving",
                text: "Automated grading and reports reduce admin work.",
                img: "/images/time-save.png"
              },
              {
                title: "Better Insights",
                text: "Comprehensive analytics for strengths and trends.",
                img: "/images/better-insights.png",
              },
              {
                title: "Engaged Learning",
                text: "Instant feedback keeps students motivated.",
                img: "/images/engaged-learning.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-blue-50 dark:bg-gray-800/50 rounded-lg shadow hover:shadow-md dark:hover:shadow-gray-900/30 transition-all border dark:border-gray-700"
              >
                {/* Image icon */}
                <div className="mb-3">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                </div>

                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />




      {/* Partners */}
      <PartnersSection />

      {/* Features */}
      <section className="py-10 px-6 bg-gray-50 dark:bg-gray-800 border-b border-transparent dark:border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-50">
            Platform Features
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Tools to simplify and secure your assessments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <div
                key={i}
                data-aos="fade-up"
                className="p-8 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-600
                     hover:shadow-lg dark:hover:shadow-gray-900/50 hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer backdrop-blur-sm"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-50">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-gray-800 border-b border-transparent dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900/50 p-4 rounded-lg shadow hover:shadow-md dark:hover:shadow-gray-900/30 cursor-pointer transition border dark:border-gray-600"
                  onClick={() => toggleFAQ(i)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{faq.question}</h3>
                    {isOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    )}
                  </div>
                  {isOpen && (
                    <p className={`mt-2 text-xs text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out`}>
                      {faq.answer}
                    </p>

                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 dark:from-gray-900 dark:to-indigo-900 text-white border-b border-transparent dark:border-gray-700">
        <div className="max-w-3xl mx-auto text-center bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-600">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Modernize Your Assessment?
          </h2>
          <p className="text-sm text-blue-100 dark:text-gray-300 mb-6">
            Join leading schools and deliver secure, scalable exams with
            MockTest Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-blue-100 text-sm shadow-lg">
              Start Implementation
            </button>
            <button className="border border-white dark:border-gray-400 px-5 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 text-sm">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
