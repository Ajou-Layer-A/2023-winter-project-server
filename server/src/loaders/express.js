const express = require('express');
const cors = require('cors');
const config = require('../config/index.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('../api');

module.exports = async (app) => {
  const corsOptions = {
    origin: config.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  };

  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  let logType;
  if (config.nodeEnv === 'production') {
    logType = 'combined';
  } else if (config.nodeEnv === 'development') {
    logType = 'dev';
  }

  app.use(morgan(logType));

  app.use(routes());
};
