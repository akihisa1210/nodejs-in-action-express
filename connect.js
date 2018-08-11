const connect = require('connect');

const logger = (req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
};

const app = connect();
app.use(logger);
app.listen(3000);
