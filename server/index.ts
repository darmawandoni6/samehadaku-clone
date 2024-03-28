import next from 'next';

import apiHandler from '../api';
import server from './app';
import createHttpError from 'http-errors';
import { errorHandler } from './middleware/handlingError';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const dev: boolean = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.use('/api', apiHandler);
  server.use('/api', (req, res, next) => {
    next(createHttpError.NotFound());
  });
  server.use('/api', errorHandler);

  server.all('*', (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

export default app;
