var express = require('express'),
  app = express(),
  io = app.get('io'),
  router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'AlexaMan'});
});

router.get('/superman', (req, res, next) => {
  res.render('index', {title: 'Express'});
});

router.get('/fly/:left/:top', function (req, res, next) {
  req.io.emit('move', {
    left: req.params.left,
    top: req.params.top
  });
  
  res.send('Superman is flying');
});

router.get('/zoom', function (req, res, next) {
  req.io.emit('zoom', {});
  res.send('Superman is flying');
});

router.get('/reset', function (req, res, next) {
  req.io.emit('reset', {});
  res.send('Superman is resetting');
});

router.get('/showoff', function (req, res, next) {
  req.io.emit('showoff', {});
  res.send('Superman is showing off');
});

module.exports = router;
