const db = require('./database');
// var _ = require('underscore');

var Blog = db.pool

var blog = new Blog({
  blog_id: Int32Array,
  blog_name: String,
  blog_lable: String,
  blog_abs: String,
  blog_time: String
});

module.exports = blog;