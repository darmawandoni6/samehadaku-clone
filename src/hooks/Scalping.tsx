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
