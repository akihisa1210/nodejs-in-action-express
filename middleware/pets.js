const pets = (req, res, next) => {
  if (req.url.match(/^\/pet\/(.+)/)) {
    // foo() is undefined, so when you use this middleware
    // a refarence error occurs.
    foo();
  } else {
    next();
  }
};

module.exports = pets;
