import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const slides = [
    process.env.PUBLIC_URL + "/img/slider.jpg",
    process.env.PUBLIC_URL + "/img/slider2.jpg",
    process.env.PUBLIC_URL + "/img/slider3.jpg",
  ];

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
      >
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img className="hero-img" src={src} alt={`slide-${idx + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}