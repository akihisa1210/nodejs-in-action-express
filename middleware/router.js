const parse = require('url').parse;

const route = (obj) => {
  return (req, res, next) => {
    if (!obj[req.method]) {
      next();
      return;
    }
    const routes = obj[req.method];
    const url = parse(req.url);
    for (const path of Object.keys(routes)) {
      const fn = routes[path];
      const re = new RegExp('^' + path + '$');
      const captures = url.pathname.match(re);
      if (captures) {
        const args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return;
      }
    }
    next();
  };
};

module.exports = route;
