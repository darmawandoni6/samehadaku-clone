export type Recommendation = {
  anime: string;
  isCompleted: boolean;
  type: string;
  image: string;
  title: string;
  epx: string;
};

export type Populer = {
  title: string;
  img: string;
  type: string;
  episode: string;
  anime: string;
};
export type Latest = {
  title: string;
  img: string;
  type: string;
  episode: string;
  anime: string;
  hotbadge: boolean;
  ul: string;
  score: string;
};

export type Scrapping = {
  populer: Populer[];
  latest: Latest[];
  genre: string[];
  filter: {
    type: string[];
    list: {
      [key: string]: string[];
    };
  };
  recommendation: {
    [key: string]: Recommendation[];
  };
};

export type ResBody<D = null> = {
  message: string;
  data: D;
};
