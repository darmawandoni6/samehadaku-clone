import axios from 'axios';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

const defaultContext: MyContext = {
  action: {
    getHome: () => null,
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

  return <MyContext.Provider value={{ data, action: { getHome } }}>{children}</MyContext.Provider>;
};
export default MyContextProvider;

export const useScalping = () => useContext(MyContext);
