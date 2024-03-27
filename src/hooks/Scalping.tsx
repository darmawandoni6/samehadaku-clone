import axios from 'axios';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

const defaultContext: MyContext = {
  action: {
    getHome: () => null,
    geListMode: () => null,
    geLatest: (page: number) => null,
  },
  data: {
    home: {
      loading: false,
      data: {
        populer: [],
        latest: [],
        genre: [],
        recommendation: {},
        type: [],
        list: {},
        filter: {
          type: [],
          list: {},
        },
      },
    },
    listMode: {},
  },
};

const MyContext = createContext<MyContext>(defaultContext);

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
      const { data } = await axios.get('/api/scrapping');

      setData((prev) => ({
        ...prev,
        home: {
          data: data.data,
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

  const geLatest = async (page: number) => {
    try {
      const { data } = await axios.get('/api/scrapping/latest', {
        params: {
          page,
        },
      });

      setData((prev) => ({
        ...prev,
        home: {
          ...prev.home,
          data: {
            ...prev.home.data,
            latest: data.data,
          },
        },
      }));
    } catch (error) {}
  };

  const geListMode = async () => {
    try {
      const { data } = await axios.get('/api/scrapping/list-anime');

      setData((prev) => ({
        ...prev,
        listMode: data.data,
      }));
    } catch (error) {}
  };

  return (
    <MyContext.Provider value={{ data, action: { getHome, geLatest, geListMode } }}>{children}</MyContext.Provider>
  );
};
export default MyContextProvider;

export const useScalping = () => useContext(MyContext);
