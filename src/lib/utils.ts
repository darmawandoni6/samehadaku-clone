export const unOptimize = (domain: string): boolean => {
  const res =
    domain.includes('cdn.myanimelist.net/images') || domain.includes('cdn.myanimelist.net/s/common/userimages');
  return !res;
};
