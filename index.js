module.exports = function (serverName) {
  const express = require('express');
  const app = express();
  app.static = express.static;
  app.serverName = serverName;
  // Protect services of well known web vulnerabilities
  app.use(require('helmet')());
  app.disable('x-powered-by');
  // Specify that the server uses the body parser for json objects
  app.use(require('body-parser').json());
  // Specify that the server uses CORS
  app.use(require('cors')());
  // gzip compression
  app.use(require('compression')());
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    return res.status(500).json(err.msg);
  });
  return {
    app: app,
    express: express
  };
};
