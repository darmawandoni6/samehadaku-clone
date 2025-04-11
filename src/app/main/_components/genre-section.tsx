import Image from 'next/image';

import { useValue } from '@/hooks/useValue';
import { unOptimize } from '@/lib/utils';

const GenreSection = () => {
  const value = useValue();
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      <div className="space-y-6">
        {value.review.slice(0, 5).map((item, i) => (
          <div className="shadow-sm border border-gray-200 rounded-md" key={i}>
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      className="aspect-square h-full w-full"
                      alt={item.user.username}
                      width={40}
                      height={40}
                      src={item.user.images.webp.image_url}
                      onError={e => {
                        e.currentTarget.src = '/placeholder.svg?height=40&amp;width=40';
                      }}
                      unoptimized={unOptimize(item.user.images.webp.image_url)}
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-lg">{item.user.username}</h3>
                    <div className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'full',
                        timeStyle: 'short',
                      }).format(new Date(item.date))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="mb-2">
                <h3 className="font-semibold text-lg mb-1">{item.entry.title}</h3>
                <p className="text-muted-foreground">{item.review}</p>
              </div>
            </div>
            <div className="items-center p-6 flex justify-between pt-0">
              <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-9 rounded-md px-3 gap-1">
                {`Reviewer’s Rating: ${item.score}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreSection;
