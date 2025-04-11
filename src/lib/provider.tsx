'use client';

import { FC, ReactNode, createContext, useState } from 'react';

import { AnimeType } from './constants';

interface InitialState {
  topAnime: AnimeApi[];
  list: AnimeApi[];
  airing: AnimeApi[];
  movie: AnimeApi[];
  complete: AnimeApi[];
  review: ReviewApi[];
  detail: {
    [id: string]: {
      data: AnimeApi;
      related: RelationAnime[];
      character: ListCharacter[];
      video: Video;
    };
  };
}
interface InitialFunc {
  onAnime: (val: string, signal: AbortSignal) => Promise<void>;
  onAnimeDetail: (id: string, signal: AbortSignal) => Promise<void>;
  onReview: (signal: AbortSignal) => Promise<void>;
}

interface Context {
  value: InitialState;
  onValue: InitialFunc;
}

const initialContext: Context = {
  value: {
    topAnime: [],
    list: [],
    airing: [],
    movie: [],
    complete: [],
    review: [],
    detail: {},
  },
  onValue: { onAnime: async () => {}, onReview: async () => {}, onAnimeDetail: async () => {} },
};

export const ContextAnime = createContext<Context>(initialContext);

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InitialState>(initialContext.value);

  const onValue: InitialFunc = {
    onAnime: async function (type: string, signal: AbortSignal): Promise<void> {
      let url: string;
      let key: keyof InitialState;

      switch (type) {
        case AnimeType.list:
          url = 'https://api.jikan.moe/v4/anime?page=1&limit=12&order_by=end_date&sort=desc&min_score=1';
          key = 'list';
          if (state.list[0]) {
            return;
          }
          break;
        case AnimeType.airing:
          url = 'https://api.jikan.moe/v4/seasons/now';
          key = 'airing';
          if (state.airing[0]) {
            return;
          }
          break;

        case AnimeType.movie:
          url = 'https://api.jikan.moe/v4/anime?page=1&limit=12&type=movie&order_by=end_date&sort=desc&min_score=1';
          key = 'movie';
          if (state.movie[0]) {
            return;
          }
          break;
        case AnimeType.complete:
          if (state.complete[0]) {
            return;
          }
          url =
            'https://api.jikan.moe/v4/anime?page=1&limit=12&status=complete&order_by=end_date&sort=desc&min_score=1';
          key = 'complete';
          break;
        default:
          url = 'https://api.jikan.moe/v4/top/anime?filter=airing';
          key = 'topAnime';
          if (state.topAnime[0]) {
            return;
          }
          break;
      }
      try {
        const data = await fetchData(url, signal);
        setState(prev => ({ ...prev, [key]: data ?? [] }));
      } catch (error) {
        console.error(error);
      }
    },
    onReview: async function (signal: AbortSignal): Promise<void> {
      if (state.review[0]) return;
      const url = 'https://api.jikan.moe/v4/reviews/anime';
      try {
        const data: ReviewApi[] = await fetchData(url, signal);
        setState(prev => ({ ...prev, review: data ?? [] }));
      } catch (error) {
        console.error(error);
      }
    },
    onAnimeDetail: async function (id: string, signal: AbortSignal): Promise<void> {
      if (state.detail[id]) return;
      const [detail, related] = await Promise.all([
        fetchData<AnimeApi>(`https://api.jikan.moe/v4/anime/${id}`, signal),
        fetchData<RelationAnime[]>(`https://api.jikan.moe/v4/anime/${id}/relations`, signal),
      ]);

      const [video, character] = await Promise.all([
        fetchData<Video>(`https://api.jikan.moe/v4/anime/${id}/videos`, signal),
        fetchData<ListCharacter[]>(`https://api.jikan.moe/v4/anime/${id}/characters`, signal),
      ]);

      if (detail && related && video && character) {
        setState(prev => ({
          ...prev,
          detail: {
            ...prev.detail,
            [id]: {
              data: detail,
              character,
              video,
              related,
            },
          },
        }));
      }
    },
  };

  async function fetchData<T>(url: string, signal: AbortSignal): Promise<T> {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error();

      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(error);
      return null as T;
    }
  }

  return <ContextAnime.Provider value={{ value: state, onValue }}>{children}</ContextAnime.Provider>;
};
