import { FC, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Badge from '@/components/badge';
import Button from '@/components/button';
import { unOptimize } from '@/lib/utils';
import { TabsContent } from '@radix-ui/react-tabs';

interface Props {
  type: string;
  data: AnimeApi[];
  hide: boolean;
  onLoadMore: () => Promise<void>;
}

const TabSchedule: FC<Props> = ({ type, data, hide, onLoadMore }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      await onLoadMore();
    } finally {
      setLoading(false);
    }
  };
  return (
    <TabsContent value={type} className="mt-0">
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
                    <span>{`${item.score ?? 0}/10`}</span>
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
      {!hide && (
        <div className="flex mt-6">
          <Button className="m-auto" onClick={handleLoadMore} loading={loading} disabled={!data[0]}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </TabsContent>
  );
};

export default TabSchedule;
