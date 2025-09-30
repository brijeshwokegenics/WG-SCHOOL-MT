// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// export default function Partners() {
//   const partners = [
//     "/images/lfs.jpg",
//     "/images/rampus.png",
//     "/images/gn.jpg",
//     "/images/s1.jpg",
//     "/images/s2.jpg",
//     "/images/s3.png",
//     "/images/s4.jpg",
//     "/images/stpaul.png",
//   ];

//   // Duplicate slides for continuous loop
//   const continuousPartners = [...partners, ...partners];

//   return (
//     <section className="py-12 dark:bg-gray-950">
//       <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
//         Our Trusted Partners
//       </h2>

//      <div className="w-[90%] mx-auto overflow-hidden">
//   <Swiper
//     modules={[Autoplay]}
//     slidesPerView={4}
//     spaceBetween={100}
//     loop={true}
//     speed={3000}
//     autoplay={{
//       delay: 0,
//       disableOnInteraction: false,
//     }}
//     allowTouchMove={false}
//     breakpoints={{
//       0: { slidesPerView: 2, spaceBetween: 20 },
//       768: { slidesPerView: 3, spaceBetween: 30 },
//       1024: { slidesPerView: 4, spaceBetween: 40 },
//     }}
//   >
//     {continuousPartners.map((logo, i) => (
//       <SwiperSlide key={i}>
//         <div className="flex items-center justify-center rounded-full h-28 w-28 sm:h-32 sm:w-32 mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition duration-300">
//           <img
//             src={logo}
//             alt={`Partner ${i + 1}`}
//             className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full opacity-90 hover:opacity-100 transition-opacity duration-300"
//           />
//         </div>
//       </SwiperSlide>
//     ))}
//   </Swiper>
// </div>

//     </section>
//   );
// }

/////////////////////////////


"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Partners() {
  const partners = [
    { img: "/images/lfs.jpg", name: "LFS School" },
    { img: "/images/rampus.png", name: "Rampus Academy" },
    { img: "/images/gn.jpg", name: "GN Institute" },
    { img: "/images/s1.jpg", name: "School 1" },
    { img: "/images/s2.jpg", name: "School 2" },
    { img: "/images/s3.png", name: "School 3" },
    { img: "/images/s4.jpg", name: "School 4" },
    { img: "/images/stpaul.png", name: "St. Paul’s" },
  ];

  const continuousPartners = [...partners, ...partners];

  return (
    <section className="py-12 dark:bg-gray-950">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Our Trusted Partners
      </h2>

      <div className="w-[90%] mx-auto overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={100}
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
          {continuousPartners.map((partner, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center justify-center rounded-full h-28 w-28 sm:h-32 sm:w-32 mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition duration-300 overflow-hidden text-center p-2">
                <img
                  src={partner.img}
                  alt={`Partner ${partner.name}`}
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-full opacity-90 hover:opacity-100 transition-opacity duration-300 mb-1"
                />
                <span
                  className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate"
                  style={{
                    maxWidth: "100%",
                    lineHeight: "1.1",
                  }}
                  title={partner.name}
                >
                  {partner.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

