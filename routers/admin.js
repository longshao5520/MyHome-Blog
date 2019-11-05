const express = require('express');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var keys = '';

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message: ''
  };
  next();
});

function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

router.post('/login', urlencodedParser, async function(req, res, next) {
  keys = randomWord(false, 16);
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var username = req.body.username;
  var password = req.body.password;

  if (username == 'longshao' && password == 'weiai123.') {
    req.cookies = new Cookies(req, res);
    req.cookies.set('userInfo', JSON.stringify({
      id: keys,
      username: username
    }), { maxAge: 3600000 });
    responseData.code = 1;
    responseData.message = '登录成功';
    res.json(responseData);
    return;
  }
  res.end();
});
router.get('/logout', function(req, res, next) {
  req.cookies = new Cookies(req, res);
  req.cookies.set('userInfo', JSON.stringify({}));
  keys = '';
  responseData.code = 1;
  responseData.message = '退出成功';
  res.json(responseData);
  res.end();
});

router.use(function(req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = {};

  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      if (req.userInfo.id == keys) {
        router.get('/', function(req, res, next) {
          res.render('admin/admin');
        });
        router.get('/addBlog', function(req, res, next) {
          res.render('admin/addBlog');
        });
        router.get('/blogList', function(req, res, next) {
          res.render('admin/blogList');
        });
      } else {
        // router.get('/login', function(req, res, next) {
        res.render('admin/login');
        // });
      }
    } catch (e) {
      res.render('admin/login');
      next();
    }
  } else {
    res.render('admin/login');
  }
  next();
});

module.exports = router;