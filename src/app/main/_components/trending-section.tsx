'use client';

import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button';
import { unOptimize } from '@/lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

const TrendingSection = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-arrow-trend-up h-5 w-5 text-primary"></i>
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <Button variant="ghost" className="text-sm gap-1">
          View All
          <i className="fa-solid fa-chevron-right h-4 w-4"></i>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {([] as any).map((item: any) => (
          <Link href="/anime-details" key={item.mal_id} className="group">
            <div className="rounded-lg overflow-hidden relative">
              <Image
                src={item.images}
                height={300}
                width={200}
                alt={`Trending Anime ${item}`}
                className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
                unoptimized={unOptimize(item.images)}
              />
              {/* <div className="absolute top-2 left-2">
                <Badge variant="default" className="bg-primary/90">
                  {item === 1 && 'New'}
                  {item === 2 && 'Hot'}
                  {item === 3 && 'Top'}
                  {item === 4 && 'New'}
                  {item === 5 && 'Hot'}
                </Badge>
              </div> */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center text-xs text-white/90">
                  <i className="fa-solid fa-star text-yellow-400 mr-1 h-3 w-3"></i>
                  <span>{`${item.score}/10`}</span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">
                {`${item.year || '-'} • ${item.genres.map((g: any) => g.name).join(', ')}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
