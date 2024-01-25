const express = require('express');
const config = require('./config/index.js');
const expressApp = require('./loaders/index.js');

async function startServer() {
  const app = express();
  expressApp(app);
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
