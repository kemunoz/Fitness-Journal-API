const mysql = require('mysql');
const mysqlConnPool = mysql.createPool(process.env.JAWSDB_URL);

module.exports = mysqlConnPool;