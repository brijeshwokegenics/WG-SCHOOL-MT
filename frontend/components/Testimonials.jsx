"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Anita Sharma",
      role: "Physics Teacher",
      quote:
        "This platform has completely transformed the way I manage my classes. The intuitive design and features are outstanding!",
    },
    {
      name: "Ravi Verma",
      role: "Mathematics Teacher",
      quote:
        "The experience has been seamless. I can easily track student performance and focus on teaching rather than paperwork.",
    },
    {
      name: "Neha Kapoor",
      role: "Chemistry Teacher",
      quote:
        "I appreciate how user-friendly this system is. It saves me hours of work every week!",
    },
    {
      name: "Vikram Singh",
      role: "Computer Science Teacher",
      quote:
        "Absolutely love the smooth workflow. The support team is also quick to respond whenever I need help.",
    },
    {
      name: "Divya Mehra",
      role: "Biology Teacher",
      quote:
        "MockTest Pro helped reduce test anxiety in my students. The feedback is immediate and insightful.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
        What Teachers Say
      </h2>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="relative"
        >
          {testimonials.map((t, i) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <SwiperSlide key={i}>
                <div className="group w-full max-w-sm h-[240px] mx-auto flex flex-col justify-between p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-600">
                  {/* Profile Initials */}
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-blue-700 transition-colors duration-300">
                    {initials}
                  </div>

                  {/* Quote */}
                  <p className="italic text-gray-700 dark:text-gray-200 text-sm leading-relaxed text-center flex-1 mt-3">
                    “{t.quote}”
                  </p>

                  {/* Name & Role */}
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </h4>
                    <span className="text-[10px] text-gray-500">{t.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Pagination dots */}
        <div className="custom-pagination mt-6 flex justify-center gap-2" />
      </div>
    </section>
  );
}
