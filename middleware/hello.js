const hello = (req, res, next) => {
  if (req.url.match(/^\/hello$/)) {
    res.endo('Hello World\n');
  } else {
    next();
  }
};

module.exports = hello;
