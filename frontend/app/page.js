"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@heroicons/react/24/solid";
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

      <div className="dark:bg-gray-950 pt-8">
        <div className="bg-white dark:bg-gray-950">
          <Carousel />
        </div>
      </div>




      {/* Hero */}
      <section className="bg-primary  dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              {/* <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full mb-4 border dark:border-blue-800">
                Trusted by 1,200+ Institutions
              </span> */}


              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full mb-6 border border-blue-200 dark:border-blue-800 shadow-sm">
                <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
                Trusted by 1,200+ Educational Institutions
              </div>

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
      <section className="py-10 px-5 bg-primary dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-12 tracking-wide text-center">
              How It Works
            </h2>
            {/* Flowchart content here */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 ">
              {/* Step 1 */}
              <div className="group flex flex-col items-center ">
                <div className="relative w-40 h-40 bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md dark:group-hover:shadow-gray-900/30 flex flex-col items-center justify-center text-center backdrop-blur-sm dark:backdrop-blur-md">
                  <div className="absolute -top-3 -left-3 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg dark:shadow-blue-900/50">
                    1
                  </div>
                  <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 ">
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
        </div>
      </section>



      {/* why Choose Our Mock Test System?*/}
      <section className="py-10 px-5 bg-primary dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-12 tracking-wide text-center">
              Why Choose Our Mock Test System?
            </h2>
            {/* Flowchart content here */}
            <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Schools need efficient and reliable assessments. Our system streamlines testing,
              provides powerful analytics, and saves teachers valuable time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Time-Saving",
                  text: "Automated grading and reports reduce admin work.",
                  img: "/images/time-save.png",
                  color: "bg-blue-100 dark:bg-blue-800",
                },
                {
                  title: "Better Insights",
                  text: "Comprehensive analytics for strengths and trends.",
                  img: "/images/better-insights.png",
                  color: "bg-green-100 dark:bg-green-800",
                },
                {
                  title: "Engaged Learning",
                  text: "Instant feedback keeps students motivated.",
                  img: "/images/engaged-learning.png",
                  color: "bg-yellow-100 dark:bg-yellow-700",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* Testimonials */}
      <Testimonials />








      {/* Partners */}
      <PartnersSection />


      {/* Platform Features */}
      <section className="py-10 px-5 bg-primary dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-12 tracking-wide text-center">
              Platform Features
            </h2>
            {/* Platform content here */}
            <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 text-center">
              Tools to simplify and secure your assessments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600
                     hover:shadow-lg dark:hover:shadow-gray-900/50 hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer backdrop-blur-sm"
                >
                  <div className="mx-auto mb-5 flex h-8 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
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
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10 px-5 bg-primary dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10">

            {/* Flowchart content here */}
            <PricingSection />

          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="py-10 px-5 bg-primary dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 md:p-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-wide text-center">
              Frequently Asked Questions
            </h2>

            {/* Subtitle */}
            <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-10">
              Get answers to common questions about our platform
            </p>

            {/* FAQ List - moved inside */}
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    <div
                      className="p-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      onClick={() => toggleFAQ(i)}
                    >
                      <h3 className="font-medium text-base text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                          }`}
                      >
                        <ChevronDownIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent mb-3"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
