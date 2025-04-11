'use client';

import { useEffect, useState } from 'react';

import Swiper from 'swiper';

import Badge from '@/components/badge';
import Button from '@/components/button';
import useTop from '@/hooks/useTop';
import { ReactSwiper, SwiperSlide } from '@/lib/swiper';

const HeroSection = () => {
  const { data, element, togglePlay, play } = useTop();

  const [swiper, setSwiper] = useState<Swiper>();

  useEffect(() => {
    if (play) {
      swiper?.autoplay.stop();

      return () => {
        swiper?.autoplay.start();
      };
    }
  }, [play, swiper]);

  if (!data[0]) return null;

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <ReactSwiper onSwiper={val => setSwiper(val)}>
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url('${item.trailer_img}?height=500&width=1000')`,
              }}
            ></div>
            {element(item.trailer, item.title, item.mal_id)}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{item.title}</h1>
              <p className="text-white/80 max-w-2xl mb-6 ellipsis-5">{item.background}</p>

              <div className="flex items-center gap-3 text-white/90 mb-4">
                <span className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-400 mr-1 h-5 w-5"></i>
                  <span className="font-medium">{`${item.score}/10`}</span>
                </span>
                <span>•</span>
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.type}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.genres.map(item => (
                  <Badge variant="secondary" className="bg-primary/20 text-primary-foreground" key={item.mal_id}>
                    {item.name}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="default" size="lg" className="rounded-full" onClick={() => togglePlay(item.mal_id)}>
                  Watch Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </section>
  );
};

export default HeroSection;
