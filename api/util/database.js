const mysql = require('mysql');
const SocksConnection = require('socksjs');
const fixieURL = process.env.FIXIE_SOCKS_HOST;
const fixieValues = fixieURL.split(new RegExp('[/(:\\/@)/]+'));

const mysqlServer = {
    host: '34.94.232.187'
};

const mysqlConnPool = mysql.createPool({
    user: 'root',
    password: `${process.env.CLOUD_SQL_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
});

module.exports = mysqlConnPool;