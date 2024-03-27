import { Router } from 'express';
import scrappingController from '../server/controller/scrapping';

const api = Router();

api.get('/scrapping/home', scrappingController.homeCache, scrappingController.home);

export default api;
