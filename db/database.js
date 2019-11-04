const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');

var pool = mysql.createPool(dbConfig.mysql);

exports.pool = pool