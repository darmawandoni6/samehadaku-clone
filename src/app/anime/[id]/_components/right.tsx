'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Button from '@/components/button';
import { useOnValue } from '@/hooks/useOnValue';
import { useValue } from '@/hooks/useValue';
import { unOptimize } from '@/lib/utils';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';

import { Type } from '../utils';
import TabsHeader from './tabs-header';

const Right = () => {
  const params = useParams<{ id: string }>();
  const value = useValue();
  const func = useOnValue();

  const [more, setMore] = useState<number>(10);
  const [animeRelated, setAnimeRelated] = useState<{ [id: string]: AnimeApi }>({});

  const {
    character,
    related,
    video,
    data: anime,
  } = useMemo(() => {
    return value.detail[params.id];
  }, [value.detail[params.id]]);

  const relatedAnime = useMemo(() => {
    if (!related) {
      return [];
    }
    return related.flatMap(item => item.entry);
  }, [related]);

  useEffect(() => {
    if (relatedAnime[0]) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchData = async (ids: string[]) => {
        for (const id of ids) {
          await func.onAnimeDetail(id, signal);
        }
      };

      fetchData(relatedAnime.map(item => item.mal_id.toString()));
      return () => {
        controller.abort();
      };
    }
  }, [relatedAnime]);

  useEffect(() => {
    if (value.detail) {
      Object.entries(value.detail)
        .filter(([id]) => id !== params.id)
        .forEach(([key, value]) => {
          setAnimeRelated(prev => ({ ...prev, [key]: value.data }));
        });
    }
  }, [value.detail]);

  const hideTab: Type[] = useMemo(() => {
    const res: Type[] = [];

    if (!Array.isArray(character)) res.push(Type.characters);
    if (!Array.isArray(video.episodes)) res.push(Type.episodes);
    return res;
  }, [character, video]);

  return (
    <div className="md:col-span-2">
      <Tabs defaultValue={Type.synopsis} className="w-full">
        <TabsHeader hide={hideTab} />
        <TabsContent value={Type.synopsis} className="mt-0">
          <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{anime.synopsis}</p>
            <h3 className="text-xl font-bold mt-8 mb-3">Background</h3>
            <p className="text-muted-foreground leading-relaxed">{anime.background || '-'}</p>
          </div>
        </TabsContent>
        <TabsContent value={Type.characters} className="flex flex-col gap-4 mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {character &&
              character.slice(0, 10).map((item, i) => (
                <div className="grid grid-cols-2 gap-2" key={i}>
                  <div className="flex gap-4 w-full">
                    <div className="w-16 aspect-[4/5] overflow-hidden flex-shrink-0">
                      <Image
                        alt={item.character.name}
                        className="w-full h-full object-cover"
                        width={40}
                        height={40}
                        src={item.character.images.webp.image_url.split('?')[0]}
                        onError={e => {
                          e.currentTarget.src = '/placeholder.svg?height=40&amp;width=40';
                        }}
                        unoptimized={unOptimize(item.character.images.webp.image_url.split('?')[0])}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate w-full">{item.character.name}</h3>
                      <p className="text-sm">{item.role}</p>
                    </div>
                  </div>
                  {item.voice_actors[0] && (
                    <div className="flex gap-4 w-full">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate w-full">{item.voice_actors[0].person.name}</h3>
                        <p className="text-sm">{item.voice_actors[0].language}</p>
                      </div>
                      <div className="w-16 aspect-[4/5] overflow-hidden flex-shrink-0">
                        <Image
                          alt={item.voice_actors[0].person.name}
                          className="w-full h-full object-cover"
                          width={40}
                          height={40}
                          src={item.voice_actors[0].person.images.jpg.image_url.split('?')[0]}
                          onError={e => {
                            e.currentTarget.src = '/placeholder.svg?height=40&amp;width=40';
                          }}
                          unoptimized={unOptimize(item.voice_actors[0].person.images.jpg.image_url.split('?')[0])}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value={Type.episodes} className="mt-0">
          <ul className="flex flex-col gap-2">
            {video &&
              video.episodes.slice(0, more).map((item, i) => (
                <li key={i}>
                  <div className="flex gap-4 w-full">
                    <div className="w-16 aspect-[4/5] overflow-hidden flex-shrink-0">
                      <Image
                        alt={item.title}
                        className="w-full h-full object-cover"
                        width={40}
                        height={40}
                        src={item.images.jpg.image_url}
                        onError={e => {
                          e.currentTarget.src = '/placeholder.svg?height=40&amp;width=40';
                        }}
                        unoptimized={unOptimize(item.images.jpg.image_url)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate w-full">{item.title}</h3>
                      <p className="text-sm">{`Episode: ${item.mal_id}`}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {more <= video.episodes.length && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() =>
                  setMore(prev => {
                    return prev + 10;
                  })
                }
              >
                Load more ...
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {video && video.promo[0] && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Trailers &amp; Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {video.promo.map((item, i) => (
              <div className="rounded-lg overflow-hidden relative group aspect-video" key={i}>
                <iframe
                  id={item.trailer.youtube_id}
                  className="w-full h-full"
                  src={item.trailer.embed_url}
                  title={item.title}
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {relatedAnime[0] && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Related Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedAnime.map(item => {
              if (!animeRelated[item.mal_id]) return;
              return (
                <Link href={`/anime/${item.mal_id}`} className="rounded-lg overflow-hidden group" key={item.mal_id}>
                  <div className="relative">
                    <Image
                      alt={item.name}
                      className="w-full h-auto"
                      width={180}
                      height={250}
                      src={animeRelated[item.mal_id].images.webp.large_image_url}
                      onError={e => {
                        e.currentTarget.src = '/placeholder.svg?height=250&amp;width=180';
                      }}
                      unoptimized={unOptimize(animeRelated[item.mal_id].images.webp.large_image_url)}
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Right;
