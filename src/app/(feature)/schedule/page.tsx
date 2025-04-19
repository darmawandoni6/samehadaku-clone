'use client';

import { useEffect, useRef, useState } from 'react';

import { useOnValue } from '@/hooks/useOnValue';
import { Tabs } from '@radix-ui/react-tabs';

import TabSchedule from './_components/tab-schedule';
import TabsHeader from './_components/tabs-header';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const Page = () => {
  const fn = useOnValue();
  const controllerRef = useRef<AbortController | null>(null);

  const [active, setActive] = useState<string>(days[0]);
  const [data, setData] = useState<AnimeApi[]>([]);
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    const signal = controller.signal;
    const now = new Date();
    const day = days[now.getDay()];
    setActive(day);
    fetch(day, false, signal);

    return () => {
      controllerRef.current?.abort(); // Cancel any ongoing request on unmount
    };
  }, []);

  async function fetch(day: string, loadMore: boolean, signal: AbortSignal) {
    const r = await fn.onSchedule(day, loadMore, signal);
    setHideLoader(r.length === data.length);
    setData(r);
  }

  const handleTab = (val: string) => {
    setActive(val);
    controllerRef.current?.abort(); // Cancel any previous fetch
    const newController = new AbortController();
    controllerRef.current = newController;
    fetch(val, false, newController.signal);
  };

  const handleLoadMore = async () => {
    controllerRef.current?.abort(); // Cancel any previous fetch
    const newController = new AbortController();
    controllerRef.current = newController;

    await fetch(active, true, newController.signal);
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12 m-auto">
      <h1 className="text-3xl font-bold tracking-tight">Schedule All Anime</h1>
      <Tabs defaultValue={days[0]} value={active} className="w-full mt-6" onValueChange={val => handleTab(val)}>
        <TabsHeader days={days} />
        <TabSchedule type={active} data={data} onLoadMore={handleLoadMore} hide={hideLoader} />
      </Tabs>
    </div>
  );
};

export default Page;
