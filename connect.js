const connect = require('connect');

const logger = (req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
};

const hello = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
};

connect()
  .use(logger)
  .use(hello)
  .listen(3000);
