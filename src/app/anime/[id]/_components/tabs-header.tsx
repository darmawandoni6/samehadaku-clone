import { FC } from 'react';

import { TabsList, TabsTrigger } from '@/components/tabs';

import { Type } from '../utils';

interface Props {
  hide?: Type[];
}
const TabsHeader: FC<Props> = ({ hide = [] }) => {
  return (
    <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto">
      {[Type.synopsis, Type.characters, Type.episodes].map(item => {
        if (hide.includes(item)) return;
        return (
          <TabsTrigger
            value={item}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4 capitalize"
            key={item}
          >
            {item}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default TabsHeader;
