declare type Populer = {
  title: string;
  img: string;
  type: string;
  episode: string;
  anime: string;
};

declare type ListMode = {
  name: string;
  href: string;
};

declare type Recommendation = {
  anime: string;
  isCompleted: boolean;
  type: string;
  image: string;
  title: string;
  epx: string;
};

declare type Latest = {
  title: string;
  img: string;
  type: string;
  episode: string;
  anime: string;
  hotbadge: boolean;
  ul: string;
  score: string;
};

declare type DataHome = {
  populer: Populer[];
  latest: Latest[];
  genre: string[];
  recommendation: {
    [key: string]: Recommendation[];
  };
  type: string[];
  list: {
    [key: string]: string[];
  };
  filter: {
    type: string[];
    list: {
      [key: string]: string[];
    };
  };
};

declare type Result = {
  home: {
    loading: boolean;
    data: DataHome;
  };
  listMode: {
    [key: string]: ListMode[];
  };
};

type MyContext = {
  data: Result;
  action: {
    getHome: () => void;
    geListMode: () => void;
    geLatest: (page: number) => void;
  };
};
