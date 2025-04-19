import { FC } from 'react';

import { TabsList, TabsTrigger } from '@/components/tabs';

interface Props {
  days: string[];
}
const TabsHeader: FC<Props> = props => {
  return (
    <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0 overflow-x-auto">
      {props.days.map((item, i) => (
        <TabsTrigger
          key={i}
          value={item}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4 capitalize"
        >
          {item}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsHeader;
