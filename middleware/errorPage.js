const errorPage = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  res.end(JSON.stringify({error: 'Internal Server error'}));
};

module.exports = errorPage;
