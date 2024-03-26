import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const code = err.status || 500;

  res.status(code);
  res.send({
    status: code,
    message: err.message || err,
    data: null,
  });
  next();
};
