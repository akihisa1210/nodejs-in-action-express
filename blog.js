const connect = require('connect');
const rewrite = require('./middleware/rewrite');

const showPost = (req, res) => {
  // console.log(req.url);
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is post');
};

const app = connect()
  .use(rewrite)
  .use(showPost);

app.listen(3000);
