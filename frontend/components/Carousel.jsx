"use client";

import { Scrollbar, A11y, Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

export default function ImageCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);  

  const slides = [
    {
      src: '/images/carousel1.jpg',
      title: 'Advanced Assessment Platform',
      subtitle: 'Streamline your testing process with intelligent automation',
      overlay: 'from-blue-900/70 to-transparent'
    },
    {
      src: '/images/carousel4.png',
      title: 'Real-time Analytics',
      subtitle: 'Get instant insights into student performance and progress',
      overlay: 'from-purple-900/70 to-transparent'
    },
    {
      src: '/images/carousel5.png',
      title: 'Secure Testing Environment',
      subtitle: 'Enterprise-grade security for all your assessments',
      overlay: 'from-green-900/70 to-transparent'
    },
  ];

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className=" relative w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      {/* Carousel Container */}
      <div className="relative group">
        <Swiper
          ref={swiperRef}
          modules={[Scrollbar, A11y, Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            el: '.swiper-pagination-custom',
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="carousel-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[5/1.5] md:aspect-[6/1.5] lg:aspect-[7/1.5] overflow-hidden">
                {/* Background Image */}
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill={true}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  className="object-cover"
                />

             
              

               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
      </div>

      {/* Styles */}
      <style jsx>{`
        .carousel-swiper {
          --swiper-theme-color: #3b82f6;
        }

        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.2);
        }

        .custom-bullet.swiper-pagination-bullet-active {
          background: #3b82f6;
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        @media (prefers-color-scheme: dark) {
          .custom-bullet {
            background: rgba(255, 255, 255, 0.2);
          }
          .custom-bullet:hover {
            background: rgba(255, 255, 255, 0.4);
          }
        }

        @media (max-width: 768px) {
          .animate-fade-in-up {
            animation-duration: 0.6s;
          }
        }
      `}</style>
    </div>
  );
}
