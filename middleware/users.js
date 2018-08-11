const db = {
  users: [
    {name: 'tobi'},
    {name: 'loki'},
    {name: 'jane'}
  ]
};

const users = (req, res, next) => {
  const match = req.url.match(/^\/users\/(.+)/);
  if (match) {
    const user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      const err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
};

module.exports = users;
