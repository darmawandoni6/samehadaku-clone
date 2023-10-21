import axios from 'axios';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { DataHome } from '../pages/api/home';

interface Result {
  home: {
    loading: boolean;
    data: DataHome;
  };
}
interface MyContextType {
  data: Result;
  getHome: () => void;
}
interface Props {
  children: ReactNode;
}

const defaultContext: MyContextType = {
  getHome: () => null,
  data: {
    home: {
      loading: false,
      data: {
        rekomendasiAnime: [],
        animePopuler: [],
        komikPopuler: [],
        newAnime: [],
        batchAnime: [],
        animeMovie: [],
      },
    },
  },
};

const MyContext = createContext<MyContextType>(defaultContext);

const MyContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [data, setData] = useState<Result>(defaultContext.data);

  const getHome = async () => {
    setData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        loading: true,
      },
    }));

    const expired = new Date(localStorage.getItem('expired') as string);
    let cache = expired > new Date();

    if (cache) {
      const rekomendasiAnime = JSON.parse(localStorage.getItem('rekomendasiAnime') as string);
      const animePopuler = JSON.parse(localStorage.getItem('animePopuler') as string);
      const komikPopuler = JSON.parse(localStorage.getItem('komikPopuler') as string);
      const newAnime = JSON.parse(localStorage.getItem('newAnime') as string);
      const batchAnime = JSON.parse(localStorage.getItem('batchAnime') as string);
      const animeMovie = JSON.parse(localStorage.getItem('animeMovie') as string);

      const get: DataHome = {
        animeMovie,
        animePopuler,
        batchAnime,
        komikPopuler,
        newAnime,
        rekomendasiAnime,
      };
      setData((prev) => ({
        ...prev,
        home: {
          data: get,
          loading: false,
        },
      }));

      return;
    }
    try {
      const { data } = await axios.get('/api/home');
      const oneHourFromNow = new Date().getTime() + 3600 * 1000;
      const result: DataHome = data;

      localStorage.setItem('expired', new Date(oneHourFromNow).toString());
      for (const key in result) {
        const k = key as keyof DataHome;
        localStorage.setItem(k, JSON.stringify(result[k]));
      }

      setData((prev) => ({
        ...prev,
        home: {
          data,
          loading: false,
        },
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        home: {
          ...prev.home,
          loading: false,
        },
      }));
    }
  };

  return <MyContext.Provider value={{ data, getHome }}>{children}</MyContext.Provider>;
};
export default MyContextProvider;

export const useScalping = () => useContext(MyContext);
