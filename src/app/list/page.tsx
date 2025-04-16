'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Badge from '@/components/badge';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useOnValue } from '@/hooks/useOnValue';
import { cn } from '@/lib/tailwind';
import { unOptimize } from '@/lib/utils';

const Page = () => {
  const path = usePathname();
  const search = useSearchParams();
  const fn = useOnValue();

  const [page, setPage] = useState(1);
  const [data, setData] = useState<AnimeApi[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const src = search.get('page') || '1';
    const pageNumber = Number(src);

    setPage(pageNumber);
    fetchData(src, signal);

    return () => {
      controller.abort();
    };
  }, [search]);

  async function fetchData(page: string, signal: AbortSignal) {
    const v = await fn.onList(page, signal);
    setData(v);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12 m-auto">
        <h1 className="text-3xl font-bold tracking-tight">List Anime</h1>
        <p className="text-secondary-foreground">Discover new and upcoming anime releases</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-6 mx-auto">
          {data.map((item, i) => (
            <Link href={`/anime/${item.mal_id}`} key={i} className="relative group">
              <Badge className="absolute right-2 top-2" variant="secondary">
                {item.type}
              </Badge>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={item.images.webp.large_image_url}
                  width={180}
                  height={250}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
                  unoptimized={unOptimize(item.images.webp.large_image_url)}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white/90 overflow-hidden">
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <div className="flex justify-between">
                    {item.episodes && <p className="text-xs mt-1">{`Episode: ${item.episodes}`}</p>}
                    <div className="flex items-center text-xs mt-1">
                      <i className="fa-solid fa-star text-yellow-400 mr-1 h-3 w-3"></i>
                      <span>{`${item.score}/10`}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.genres.slice(0, 2).map(g => (
                      <Badge variant="default" className="bg-white text-black" key={g.mal_id}>
                        {g.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {['left', 'right'].map((item, i) => {
            return (
              <Link
                className={cn(
                  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
                  { ['hidden']: item === 'left' && page === 1 },
                )}
                href={{
                  pathname: path,
                  query: {
                    page: item === 'left' ? page - 1 : page + 1,
                  },
                }}
                key={i}
              >
                {item === 'left' ? 'Prev Page' : 'Next Page'}
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
