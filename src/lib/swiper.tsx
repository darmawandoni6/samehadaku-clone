'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

import Swiper from 'swiper/bundle';

interface Props {
  children: ReactNode;
  onSwiper?: (swiper: Swiper) => void;
}

const ReactSwiper: FC<Props> = ({ children, onSwiper }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const swiper = new Swiper(ref.current, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 2500,
          pauseOnMouseEnter: true,
        },

        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      });

      if (onSwiper) onSwiper(swiper);
      return () => {
        swiper.destroy();
      };
    }
  }, []);

  return (
    <div ref={ref} className="swiper">
      <div className="swiper-wrapper">{children}</div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

const SwiperSlide: FC<Props> = ({ children }) => {
  return <div className="swiper-slide">{children}</div>;
};
SwiperSlide.displayName = 'SwiperSlide';

export { ReactSwiper, SwiperSlide };
