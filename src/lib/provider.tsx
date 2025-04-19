'use client';

import { FC, ReactNode, createContext, useState } from 'react';

import { AnimeType } from './constants';
import { TimerFetch } from './fetch';

interface Detail {
  data: AnimeApi;
  related: RelationAnime[];
  character: ListCharacter[];
  video: Video;
}
interface InitialState {
  myList: {
    genre: {
      [page: string]: AnimeApi[];
    };
    data: {
      [page: string]: AnimeApi[];
    };
  };
  topAnime: AnimeApi[];
  list: AnimeApi[];
  airing: AnimeApi[];
  movie: AnimeApi[];
  complete: AnimeApi[];
  review: ReviewApi[];
  detail: {
    [id: string]: Detail;
  };
  genre: GenreAnime[];
  schedule: {
    [day: string]: {
      page: number;
      data: AnimeApi[];
    };
  };
}
interface InitialFunc {
  onAnime: (val: string, signal: AbortSignal) => Promise<void>;
  onAnimeDetail: (id: string, signal: AbortSignal) => Promise<void>;
  onSubAnimeDetail: (id: string, signal: AbortSignal) => Promise<void>;
  onReview: (signal: AbortSignal) => Promise<void>;
  onList: (page: string, opt: { genres?: string; signal: AbortSignal }) => Promise<AnimeApi[]>;
  onListGenre: (signal: AbortSignal) => Promise<GenreAnime[]>;
  onSchedule: (day: string, loadMore: boolean, signal: AbortSignal) => Promise<AnimeApi[]>;
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
    myList: {
      genre: {},
      data: {},
    },
    genre: [],
    schedule: {},
  },
  onValue: {
    onAnime: async () => {},
    onReview: async () => {},
    onAnimeDetail: async () => {},
    onSubAnimeDetail: async () => {},
    onList: async function () {
      return [];
    },
    onListGenre: async function (): Promise<GenreAnime[]> {
      return [];
    },
    onSchedule: async function (): Promise<AnimeApi[]> {
      return [];
    },
  },
};

export const ContextAnime = createContext<Context>(initialContext);

const time = new TimerFetch();

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
      time.start();
      await Promise.allSettled([handleDetail<AnimeApi>('data', id, signal)]);
      await time.stop();
    },
    onSubAnimeDetail: async function (id: string, signal: AbortSignal): Promise<void> {
      time.start();
      await Promise.allSettled([
        handleDetail<Video>('video', id, signal),
        handleDetail<RelationAnime[]>('related', id, signal),
        handleDetail<ListCharacter[]>('character', id, signal),
      ]);
      await time.stop();
    },
    onList: async function (page: string, opt: { genres?: string; signal: AbortSignal }): Promise<AnimeApi[]> {
      const { genres, signal } = opt;
      if (genres && state.myList.genre[`${genres}-${page}`]) {
        return state.myList.genre[`${genres}-${page}`];
      } else if (state.myList.data[page]) {
        return state.myList.data[page];
      }
      let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=12&order_by=end_date&sort=desc&min_score=1`;
      if (genres) {
        url += `&genres=${genres}`;
      }
      const data: AnimeApi[] = await fetchData(url, signal);
      setState(prev => ({
        ...prev,
        myList: {
          ...prev.myList,
          ...(genres
            ? {
                genre: {
                  ...prev.myList.genre,
                  [`${genres}-${page}`]: data,
                },
              }
            : {
                data: {
                  ...prev.myList.data,
                  [page]: data,
                },
              }),
        },
      }));

      return data;
    },
    onListGenre: async function (signal: AbortSignal): Promise<GenreAnime[]> {
      if (state.genre[0]) {
        return state.genre;
      }
      const url = 'https://api.jikan.moe/v4/genres/anime?filter=genres';
      const data: GenreAnime[] = await fetchData(url, signal);
      setState(prev => ({ ...prev, genre: data }));
      return data ?? [];
    },
    onSchedule: async function (day: string, loadMore: boolean, signal: AbortSignal): Promise<AnimeApi[]> {
      const { data: v_d, page: v_p } = state.schedule[day] ?? { data: [], page: 1 };
      if (!loadMore && v_d[0]) {
        return v_d;
      }
      let page = v_p ?? 1;
      if (loadMore) {
        page += 1;
      }

      const url = `https://api.jikan.moe/v4/schedules?page=${page}&limit=12&filter=${day}`;
      const data: AnimeApi[] = await fetchData(url, signal);
      setState(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: {
            page,
            data: [...(prev.schedule[day] ? [...prev.schedule[day].data] : []), ...data],
          },
        },
      }));

      return [...v_d, ...data];
    },
  };

  const handleDetail = async <T,>(key: keyof Detail, id: string, signal: AbortSignal) => {
    if (state.detail[id] && state.detail[id][key]) return;

    let url: string;
    let defValue = null;
    switch (key) {
      case 'related':
        url = `https://api.jikan.moe/v4/anime/${id}/relations`;
        defValue = [] as T;
        break;

      case 'video':
        url = `https://api.jikan.moe/v4/anime/${id}/videos`;
        break;

      case 'character':
        url = `https://api.jikan.moe/v4/anime/${id}/characters`;
        defValue = [] as T;
        break;

      default:
        url = `https://api.jikan.moe/v4/anime/${id}`;
        break;
    }
    const data = await fetchData<T>(url, signal);

    setState(prev => ({
      ...prev,
      detail: {
        ...prev.detail,
        [id]: {
          ...prev.detail[id],
          [key]: data ?? defValue,
        },
      },
    }));
  };

  async function fetchData<T>(url: string, signal: AbortSignal): Promise<T> {
    try {
      const res = await fetch(url, { signal });

      if (!res.ok) {
        console.warn(`Request failed with status ${res.status}`);
        return null as T;
      }
      const data = await res.json();

      return data.data;
    } catch (error) {
      console.error(error);
      return null as T;
    }
  }

  return <ContextAnime.Provider value={{ value: state, onValue }}>{children}</ContextAnime.Provider>;
};
