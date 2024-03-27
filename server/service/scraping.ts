import createHttpError from 'http-errors';
import type { AnimeScraping } from '../type';
import animeScrapingModel from '../model/animeScraping';

const scrapingService = {
  create: async (payload: AnimeScraping): Promise<void> => {
    try {
      await animeScrapingModel.create(payload);
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  },
  findPage: async (type: string): Promise<AnimeScraping[]> => {
    try {
      const res = await animeScrapingModel.findAll({ where: { type }, order: [['id', 'DESC']], limit: 1 });
      return res;
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  },
};
export default scrapingService;
