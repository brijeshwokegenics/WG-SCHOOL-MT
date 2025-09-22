"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Partners() {
  const partners = [
    "/images/lfs.jpg",
    "/images/rampus.png",
    "/images/gn.jpg",
    "/images/stpaul.png",
  ];

  // Duplicate slides for continuous loop
  const continuousPartners = [...partners, ...partners];

  return (
    <section className="py-12 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Our Trusted Partners
      </h2>

      <div className="max-w-2xl mx-auto overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={-10}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {continuousPartners.map((logo, i) => (
            <SwiperSlide key={i}>
              <div className="flex items-center justify-center rounded-full h-28 w-28 sm:h-32 sm:w-32 mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition duration-300">
                <img
                  src={logo}
                  alt={`Partner ${i + 1}`}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
