'use client';

import { useEffect, useRef, useState } from 'react';

import { HeroSectionView } from '@/app/main/types';
import Trailer from '@/components/trailer';

import { useValue } from './useValue';

const useTop = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const value = useValue();

  const [data, setData] = useState<HeroSectionView[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [idVideo, setIdVideo] = useState<number>();

  useEffect(() => {
    return setData(
      value.topAnime
        .filter(item => !!item.trailer.url && !!item.background)
        .map(item => ({
          mal_id: item.mal_id,
          title: item.title,
          background: item.background || '-',
          score: item.score ?? 0,
          year: item.year ?? 0,
          type: item.type,
          genres: item.genres.map(g => ({
            mal_id: g.mal_id,
            type: g.type,
            name: g.name,
          })),
          trailer: item.trailer.embed_url ?? '',
          trailer_img: item.trailer.images.maximum_image_url ?? '',
        })),
    );
  }, [value.topAnime]);

  const togglePlay = (id: number) => {
    setShowTrailer(prev => !prev);
    setIsPlaying(prev => !prev);
    setIdVideo(prev => {
      if (prev) return undefined;
      return id;
    });
  };

  const closeTrailer = (id: number) => {
    togglePlay(id);

    // Stop video
    try {
      if (videoRef.current && videoRef.current.contentWindow) {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      }
    } catch (error) {
      console.error('Error stopping YouTube video:', error);
    }
  };

  const element = (url: string, title: string, id: number) => {
    if (showTrailer && id === idVideo)
      return <Trailer ref={videoRef} closeTrailer={() => closeTrailer(id)} url={url} title={title} />;
    return;
  };

  return {
    data: data,
    play: isPlaying,
    togglePlay,
    element: (url: string, title: string, id: number) => element(url, title, id),
  };
};

export default useTop;
