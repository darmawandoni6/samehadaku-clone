import { useContext } from 'react';

import { ContextAnime } from '@/lib/provider';

export const useOnValue = () => {
  const ctx = useContext(ContextAnime);
  return ctx.onValue;
};
