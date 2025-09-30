"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
    <section className="py-5 px-4 dark:from-gray-900 dark:to-gray-800">
      
       <h2 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
         What Teachers Say
      </h2>

      <div className="max-w-6xl mx-auto mb-3">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                <div className="group w-full max-w-sm h-[260px] mx-auto flex flex-col justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-500 dark:border-gray-700">
                  {/* Avatar Initials */}
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-md group-hover:scale-110 transition-transform duration-300">
                    {initials}
                  </div>

                  {/* Quote */}
                  <p className="italic text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed text-center mt-4">
                    “{t.quote}”
                  </p>

                  {/* Name & Role */}
                  <div className="mt-6 text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t.role}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Pagination Placeholder (optional, use Swiper's Pagination if desired) */}
        {/* You can implement Swiper's built-in pagination here if needed */}
      </div>
    </section>
  );
}
