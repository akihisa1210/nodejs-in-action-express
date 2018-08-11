const setup = (format) => {
  const regexp = /:(\w+)/g;

  const logger = (req, res, next) => {
    const str = format.replace(regexp, (match, property) => {
      return req[property];
    });
    // eslint-disable-next-line no-console
    console.log(str);
    next();
  };
  return logger;
};

module.exports = setup;
