'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useOnValue } from '@/hooks/useOnValue';

const Page = () => {
  const fn = useOnValue();

  const [data, setData] = useState<GenreAnime[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetch = async () => {
      const r = await fn.onListGenre(signal);
      setData(r);
    };
    fetch();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12 m-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Anime Categories</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map(item => (
          <div
            className="flex flex-col justify-between rounded-lg border border-border p-4 shadow-sm transition-all hover:shadow-md"
            key={item.mal_id}
          >
            <div className="flex items-center justify-between">
              <Link
                href={{
                  pathname: '/list',
                  query: { page: 1, genres: item.mal_id },
                }}
                className="text-lg font-medium hover:underline"
              >
                {item.name}
              </Link>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                {`${item.count.toLocaleString()} anime`}
              </div>
              <Link
                href={{
                  pathname: '/list',
                  query: { page: 1, genres: item.mal_id },
                }}
                className="text-xs text-muted-foreground hover:underline"
              >
                View on Category
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
