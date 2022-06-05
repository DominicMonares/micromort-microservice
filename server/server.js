const express = require('express');

const router = require('./routes.js');

const createServer = () => {
  const app = express();
  app.use('/', router);
  app.use(express.json());
  return app;
}

module.exports = createServer;
