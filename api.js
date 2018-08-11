const connect = require('connect');
const hello = require('./middleware/hello');
const users = require('./middleware/users');
const pets = require('./middleware/pets');
const errorHandler = require('./middleware/errorHandler');
const errorPage = require('./middleware/errorPage');

const api = connect()
  .use(users)
  .use(pets)
  .use(errorHandler);

const app = connect()
  .use(hello)
  .use('/api', api)
  .use(errorPage);

app.listen(3000);
