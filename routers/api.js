const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/database');
const marked = require('marked');
const router = express.Router();

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

//拉取留言列表
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

//拉取文章列表
router.get('/blogList', function(req, res, next) {
  db.pool.getConnection(function(err, connection) {
    var sql = "SELECT * FROM blog;";
    connection.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result);
      connection.release();
    });
  });
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next();
});

//添加留言
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

//添加文章
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
    var sql = "SELECT * from blog WHERE blog_name=?;";
    var addSqlParams = [blogName];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;
      // console.log(result)
      results = JSON.stringify(result)
      result = JSON.parse(results)
      fs.writeFile(path.join(__dirname, '../../blog/' + result[0].id + '.md'), blogCon, function(error) {
        if (error) {
          console.log(error)
        } else {
          console.log('写入成功');
          res.send("OK");
        }
      });
    });
  });
});

//拉取文章内容
router.post('/getBlog', urlencodedParser, async function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var blogId = req.body.blogId;
  db.pool.getConnection(function(err, connection) {
    var blogData = {
      blogName: '',
      blogLable: '',
      blogAbs: '',
      blogCon: ''
    }
    var sql = "SELECT * from blog WHERE id=?;";
    var addSqlParams = [blogId];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;
      results = JSON.stringify(result)
      result = JSON.parse(results)
      fs.readFile(path.join(__dirname, '../../blog/' + blogId + '.md'), function(err, data) {
        if (err) {
          console.log("文件不存在！");
          res.send("文件不存在！");
        } else {
          blogData.blogName = result[0].blog_name;
          blogData.blogLable = result[0].blog_lable;
          blogData.blogAbs = result[0].blog_abs;
          blogData.blogCon = data.toString();
          res.json(blogData);
        }
      });
    });
  });
});

//修改文章
router.post('/modifyBlog', urlencodedParser, async function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var blogID = req.body.blogID;
  var blogName = req.body.blogName;
  var blogLable = req.body.blogLable;
  var blogAbs = req.body.blogAbs;
  var blogCon = req.body.blogCon;
  var date = new Date();
  var day = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "时" + date.getMinutes() + "分";
  db.pool.getConnection(function(err, connection) {
    var sql = "UPDATE blog SET blog_name=? ,blog_lable=?,blog_abs=?,blog_time=? WHERE id=?;";
    var addSqlParams = [blogName, blogLable, blogAbs, day, blogID];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;

      fs.writeFile(path.join(__dirname, '../../blog/' + blogID + '.md'), blogCon, function(error) {
        if (error) {
          console.log(error)
        } else {
          console.log('写入成功');
          res.send("OK");
        }
      });
      //   }
      // });
      connection.release();
    });
  });
});

//删除文章
router.post('/deleteBlog', urlencodedParser, async function(req, res, next) {
  var blogID = req.body.blogID;
  console.log(blogID);
  db.pool.getConnection(function(err, connection) {
    var sql = "DELETE FROM blog WHERE id=?;";
    var addSqlParams = [blogID];
    connection.query(sql, addSqlParams, function(err, result) {
      if (err) throw err;
      fs.unlink(path.join(__dirname, '../../blog/' + blogID + '.md'), function(error) {
        if (error) {
          console.log(error);
        }
        res.json('OK');
      });
      connection.release();
    });
  });
});

module.exports = router;