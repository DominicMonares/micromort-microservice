const express = require('express');

const router = require('./routes.js');

const createServer = () => {
  const app = express();
  app.use('/', router);
  return app;
}

module.exports = createServer;
