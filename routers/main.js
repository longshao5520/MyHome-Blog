const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main/index');
});

router.get('/blog', function(req, res, next) {

  res.render('main/blog');
});

router.get('/message', function(req, res, next) {
  res.render('main/message');
});

module.exports = router;