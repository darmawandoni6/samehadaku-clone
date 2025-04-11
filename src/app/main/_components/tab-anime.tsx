'use client';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useAnime from '@/hooks/useAnime';
import { unOptimize } from '@/lib/utils';
import { TabsContent } from '@radix-ui/react-tabs';

import { AnimeType } from '../types';

interface Props {
  type: AnimeType;
}
const TabAnime: FC<Props> = ({ type }) => {
  const data = useAnime({ type });

  return (
    <TabsContent value={type} className="mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((item, i) => (
          <Link href={`/anime/${item.mal_id}`} key={i} className="group">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={item.images}
                width={180}
                height={250}
                alt={item.title}
                className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
                unoptimized={unOptimize(item.images)}
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <i className="fa-solid fa-star text-yellow-400 mr-1 h-3 w-3"></i>
                <span>{`${item.score}/10`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </TabsContent>
  );
};

export default TabAnime;
