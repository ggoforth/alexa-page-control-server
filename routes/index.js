var express = require('express'),
  app = express(),
  io = app.get('io'),
  router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Express'});
});

router.get('/superman', (req, res, next) => {
  res.render('index', {title: 'Express'});
});

router.get('/fly/:left/:top', function (req, res, next) {
  req.io.emit('move', {
    left: req.params.left,
    top: req.params.top
  });
  
  res.send(200);
});

module.exports = router;
