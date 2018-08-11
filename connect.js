const connect = require('connect');

const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('%s %s', req.method, req.url);
  next();
};

const hello = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
};

const isAuthenticatedUser = (user, pass) => {
  // dummy authencication checker
  if (user === 'hoge' && pass === 'fuga') {
    return true;
  } else {
    return false;
  }
};

const restrict = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return next(new Error('Unauthorizated'));

  const parts = authorization.split(' ');
  const scheme = parts[0];
  const auth = Buffer.from(parts[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (scheme.search(/^basic$/i) && isAuthenticatedUser(user, pass)) {
    return next();
  } else {
    return next(new Error('Unauthorizated'));
  }
};

connect()
  .use(logger)
  .use('/admin', restrict)
  .use(hello)
  .listen(3000);
