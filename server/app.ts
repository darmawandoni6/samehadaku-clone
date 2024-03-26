import express from 'express';

const server = express();

server.use('/api', express.json());
server.use('/api', express.urlencoded({ extended: true }));

export default server;
