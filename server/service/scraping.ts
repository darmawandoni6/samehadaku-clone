import createHttpError from 'http-errors';
import type { AnimeScraping } from '../type';
import animeScrapingModel from '../model/animeScraping';
import { Op } from 'sequelize';
import moment from 'moment';

const scrapingService = {
  create: async (payload: AnimeScraping[]): Promise<void> => {
    try {
      await animeScrapingModel.bulkCreate(payload);
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  },
  findPage: async (type: string[], query = ''): Promise<AnimeScraping[]> => {
    try {
      const res = await animeScrapingModel.findAll({
        where: {
          date: moment().format('YYYY-MM-DD'),
          query,
          type: {
            [Op.in]: type,
          },
        },
        order: [['id', 'DESC']],
      });
      return res.map((item) => item.toJSON());
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  },
};
export default scrapingService;
