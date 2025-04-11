'use client';

import { useEffect, useMemo, useState } from 'react';

import { AnimeType, AnimeView } from '@/app/main/types';

import { useValue } from './useValue';

interface Props {
  type: AnimeType;
}

const useAnime = ({ type }: Props) => {
  const value = useValue();

  const [data, setData] = useState<AnimeView[]>([]);

  const dataMock = useMemo(() => {
    const res: Partial<Record<AnimeType, AnimeApi[]>> = {
      [AnimeType.list as string]: value.list,
      [AnimeType.movie as string]: value.movie,
      [AnimeType.complete as string]: value.complete,
      [AnimeType.airing as string]: Array.from(new Set(value.airing.map(item => item.mal_id))).map(item => {
        return value.airing.find(a => a.mal_id === item);
      }),
    };
    return res[type] ?? [];
  }, [type, value]);

  useEffect(() => {
    setData(
      dataMock.map(item => ({
        mal_id: item.mal_id,
        title: item.title,
        score: item.score ?? 0,
        genres: item.genres.slice(0, 2).map(g => ({
          mal_id: g.mal_id,
          type: g.type,
          name: g.name,
        })),
        images: item.images.webp.large_image_url,
        year: item.year ?? 0,
      })),
    );
  }, [dataMock]);

  return data;
};

export default useAnime;
