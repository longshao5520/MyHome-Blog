const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ly'
});

var urlencodedParser = bodyParser.urlencoded({ extended: true })

connection.connect();

router.get('/messageList', function(req, res, next) {

  var sql = "SELECT * FROM ly";
  connection.query(sql, function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/addMessage', urlencodedParser, async function(req, res, next) {
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var username = req.body.name;
  var lyConten = req.body.lyConten;
  var date = new Date();
  var day = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
  var addsql = "INSERT INTO ly(uname,content,date) VALUES(?,?,?);";
  var addSqlParams = [username, lyConten, day];
  connection.query(addsql, addSqlParams, function(error, results) {
    if (error) throw error;
    res.json('OK');
  });
});

module.exports = router;