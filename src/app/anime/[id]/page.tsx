'use client';

import { useEffect, useMemo } from 'react';

import { useParams } from 'next/navigation';

import Header from '@/components/header';
import { useOnValue } from '@/hooks/useOnValue';
import { useValue } from '@/hooks/useValue';

import Badge from './_components/badge';
import Left from './_components/left';
import Right from './_components/right';

const Page = () => {
  const params = useParams<{ id: string }>();
  const func = useOnValue();
  const value = useValue();

  const { data: anime, video } = useMemo(() => {
    if (value.detail[params.id]) {
      return value.detail[params.id];
    }
    return {
      data: null,
      related: [],
      character: [],
      video: null,
    };
  }, [value.detail[params.id]]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetch = async () => {
      await func.onAnimeDetail(params.id, signal);
      await func.onSubAnimeDetail(params.id, signal);
    };
    fetch();
    return () => {
      controller.abort();
    };
  }, []);

  if (!anime) return;

  return (
    <>
      <Header />
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 blur-sm"
          style={{ backgroundImage: `url(${anime.images.webp.large_image_url})` }}
        ></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{anime.title}</h1>

          <div className="flex items-center gap-3 text-white/90 mb-4">
            <span className="flex items-center">
              <i className="fa-solid fa-star text-yellow-400 mr-1 h-5 w-5"></i>
              <span className="font-medium">{`${anime.score}/10`}</span>
            </span>
            <span>•</span>
            <span>{anime.year}</span>
            <span>•</span>
            <span>{anime.type}</span>
            <span>•</span>
            <span>{`${anime.episodes} Episodes`}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres.map(item => (
              <Badge text={item.name} key={item.mal_id} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Left />
          {video && <Right />}
        </div>
      </div>
    </>
  );
};

export default Page;
