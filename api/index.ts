import { Router } from 'express';
import scrappingController from '../server/controller/scrapping';

const api = Router();

api.get('/scrapping', scrappingController.homeCache, scrappingController.home);
api.get('/scrapping/latest', scrappingController.latestCache, scrappingController.latest);
api.get('/scrapping/list-anime', scrappingController.listAnimeCache, scrappingController.listAnime);

export default api;
