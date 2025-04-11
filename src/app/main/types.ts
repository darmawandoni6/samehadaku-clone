interface Genre {
  mal_id: number;
  type: string;
  name: string;
}

export enum AnimeType {
  list = 'list',
  airing = 'airing',
  complete = 'complete',
  movie = 'movie',
}

export interface HeroSectionView {
  mal_id: number;
  title: string;
  background: string;
  score: number;
  year: number;
  type: string;
  genres: Genre[];
  trailer: string;
  trailer_img: string;
}

export interface AnimeView {
  mal_id: number;
  title: string;
  score: number;
  genres: Genre[];
  images: string;
  year: number;
}
