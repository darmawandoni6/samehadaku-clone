import { TabsList, TabsTrigger } from '@/components/tabs';

import { AnimeType } from '../types';

const TabsHeader = () => {
  return (
    <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto">
      <TabsTrigger
        value={AnimeType.list}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
      >
        List
      </TabsTrigger>
      <TabsTrigger
        value={AnimeType.airing}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
      >
        New Releases
      </TabsTrigger>
      <TabsTrigger
        value={AnimeType.movie}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
      >
        Movie
      </TabsTrigger>
      <TabsTrigger
        value={AnimeType.complete}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
      >
        Complete
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
