import { useMemo } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useValue } from '@/hooks/useValue';
import { unOptimize } from '@/lib/utils';

const Left = () => {
  const params = useParams<{ id: string }>();
  const value = useValue();
  const anime = useMemo(() => {
    return value.detail[params.id].data;
  }, [value.detail[params.id]]);

  return (
    <div className="md:col-span-1">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Image
          alt={anime.title}
          className="w-full h-auto"
          width={300}
          height={400}
          src={anime.images.webp.large_image_url}
          onError={e => {
            e.currentTarget.src = '/placeholder.svg?height=450&amp;width=300';
          }}
          unoptimized={unOptimize(anime.images.webp.large_image_url)}
        />
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Information</h3>
          <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full mb-3"></div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Type:</dt>
              <dd>{anime.type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status:</dt>
              <dd>{anime.status}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Aired:</dt>
              <dd>{anime.aired.string}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Studios:</dt>
              <dd>{anime.studios.map(item => item.name).join(', ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Source:</dt>
              <dd>{anime.source}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Left;
