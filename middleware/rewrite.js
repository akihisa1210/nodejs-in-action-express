const parse = require('url').parse;

const findPostIdBySlug = (articleName, callback) => {
  if (articleName === 'example') {
    return callback(null, 1);
  } else {
    return callback(new Error('Post not found'));
  }
};

const rewrite = (req, res, next) => {
  const path = parse(req.url).pathname;
  const match = path.match(/^\/blog\/posts\/(.+)/);
  if (match) {
    findPostIdBySlug(match[1], (err, id) => {
      if (err) return next(err);
      if (!id) return next(new Error('User not found'));
      req.url = '/blog/posts/' + id;
      return next();
    });
  } else {
    return next();
  }
};

exports.module = rewrite;
