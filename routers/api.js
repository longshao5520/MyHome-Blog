const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();
const db = require('../db/database');


var responseJSON = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

var urlencodedParser = bodyParser.urlencoded({ extended: true })

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next();
});

router.get('/messageList', function(req, res, next) {
  db.pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM ly;";
    connection.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result);
      connection.release();
    });
  });

});

router.post('/addMessage', urlencodedParser, function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var username = req.body.name;
  var lyConten = req.body.lyConten;
  var date = new Date();
  var day = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
  db.pool.getConnection(function(err, connection) {
    var sql = "INSERT INTO ly(uname,content,date) VALUES(?,?,?);";
    var addSqlParams = [username, lyConten, day];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;
      res.json('OK');
      connection.release();
    });
  });
});

router.post('/login', urlencodedParser, async function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var username = req.body.username;
  var password = req.body.password;

  if (username == 'longshao' && password == 'weiai123.') {
    responseData.code = 1;
    responseData.message = '登录成功';
    res.json(responseData);
    return;
  }
  res.end();
});

router.post('/addBlog', urlencodedParser, async function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var blogName = req.body.blogName;
  var blogLable = req.body.blogLable;
  var blogAbs = req.body.blogAbs;
  var blogCon = req.body.blogCon;
  var date = new Date();
  var day = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "时" + date.getMinutes() + "分";

  db.pool.getConnection(function(err, connection) {
    var sql = "INSERT INTO blog(blog_name,blog_lable,blog_abs,blog_time) VALUES(?,?,?,?);";
    var addSqlParams = [blogName, blogLable, blogAbs, day];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;
      connection.release();
    });
    var sql = "INSERT INTO blog(blog_name,blog_lable,blog_abs,blog_time) VALUES(?,?,?,?);";
    var addSqlParams = [blogName, blogLable, blogAbs, day];
  });
  res.end();
  connection.query(sql, addSqlParams, function(err, result) {
    if (err) throw err;
    fs.writeFile('../public/blog/' + result.blog_id + '.md', blogCon, function(error) {
      if (error) {
        console.log('写入失败')
      } else {
        console.log('写入成功')
      }
    });
    res.json('OK');
    connection.release();

  });

});


module.exports = router;
// 删除文件
// fs.unlinkSync('./uploads/' + filename);