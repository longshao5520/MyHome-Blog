const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/admin');
});

router.get('/login', function(req, res, next) {
  res.render('admin/login');
});

router.get('/addBlog', function(req, res, next) {
  res.render('admin/addBlog');
});

router.get('/blogList', function(req, res, next) {
  res.render('admin/blogList');
});


module.exports = router;