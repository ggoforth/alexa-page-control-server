var express = require('express'),
  app = express(),
  io = app.get('io'),
  router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'BitwiseMan - An Amazon Alexa Skill'});
});

router.get('/fly/:left/:top', function (req, res, next) {
  req.io.emit('move', {
    left: req.params.left,
    top: req.params.top
  });

  res.send('Bitwise Man is flying');
});

router.get('/zoom', function (req, res, next) {
  req.io.emit('zoom', {});
  res.send('Bitwise Man is flying');
});

router.get('/reset', function (req, res, next) {
  req.io.emit('reset', {});
  res.send('Bitwise Man is resetting');
});

router.get('/showoff', function (req, res, next) {
  req.io.emit('showoff', {});
  res.send('Bitwise Man is showing off');
});

router.get('/privacy', function (req, res, next) {
  res.render('privacy');
});

router.get('/privacy', function (req, res, next) {
  res.render('terms');
});

module.exports = router;
