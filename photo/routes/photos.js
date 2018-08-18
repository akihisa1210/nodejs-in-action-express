var photos = [];

photos.push({
  name: 'dummy-name',
  path: 'dummy-link'
});

exports.list = function(req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  });
};
