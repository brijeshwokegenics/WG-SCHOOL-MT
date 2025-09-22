"use client";

import { Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Image from 'next/image';

export default function ImageCarousel() {
  const slides = [
    '/images/carousel1.jpg',
    '/images/carousel2.png',
    '/images/carousel3.png',
  ];

  return (
    <div className="mx-auto w-[85vw] bg-primary dark:bg-gray-800">
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-[7/1]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill={true}
                priority={index === 0}
                sizes="80vw"
                className="object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
