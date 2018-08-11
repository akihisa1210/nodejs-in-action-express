const connect = require('connect');
const logger = require('./middleware/logger');

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

  if (scheme.search(/^basic$/i) === 0 && isAuthenticatedUser(user, pass)) {
    return next();
  } else {
    return next(new Error('Unauthorizated'));
  }
};

const admin = (req, res) => {
  switch (req.url) {
    case '/':
      res.end('try /users');
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']));
      break;
  }
};

const app = connect()
  .use(logger(':method :url'))
  .use('/admin', restrict)
  .use('/admin', admin)
  .use(hello);

app.listen(3000);
