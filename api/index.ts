import { Router } from 'express';
import scrappingController from '../server/controller/scrapping';

const api = Router();

api.get('/scrapping', scrappingController);

export default api;
