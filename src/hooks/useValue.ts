import { useContext } from 'react';

import { ContextAnime } from '@/lib/provider';

export const useValue = () => {
  const ctx = useContext(ContextAnime);
  return ctx.value;
};
