'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useOnValue } from '@/hooks/useOnValue';
import { TimerFetch } from '@/lib/fetch';

import Footer from '../../components/footer';
import Header from '../../components/header';
import { Tabs } from '../../components/tabs';
import GenreSection from './_components/genre-section';
import HeroSection from './_components/hero-section';
import TabAnime from './_components/tab-anime';
import TabsHeader from './_components/tabs-header';
import { AnimeType } from './types';

const time = new TimerFetch();

const Main = () => {
  const func = useOnValue();
  const search = useSearchParams();

  const [tab, setTab] = useState<AnimeType>(AnimeType.list);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const type = search.get('tab') as AnimeType;

    fetch(type, signal);
    setTab(type ?? AnimeType.list);
    return () => {
      controller.abort();
    };
  }, [search]);

  async function fetch(type: string, signal: AbortSignal) {
    time.start();
    await Promise.allSettled([func.onAnime(type, signal), func.onAnime(AnimeType.list, signal), func.onReview(signal)]);
    await time.stop();
  }

  const handleTab = (() => {
    let controller: AbortController | null = null;

    return async (val: string) => {
      // Abort previous request
      if (controller) controller.abort();

      // Create a new controller
      controller = new AbortController();
      const signal = controller.signal;

      time.start();
      await func.onAnime(val, signal); // assuming func.onAnime can handle signal
      await time.stop();

      setTab(val as AnimeType);
    };
  })();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        {/* <TrendingSection /> */}
        <section className="mb-12">
          <Tabs defaultValue={AnimeType.list} value={tab} className="w-full" onValueChange={handleTab}>
            <TabsHeader />
            <TabAnime type={tab} />
          </Tabs>
        </section>
        <GenreSection />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
