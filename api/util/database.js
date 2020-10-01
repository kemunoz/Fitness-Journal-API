const mysql = require('mysql');
const SocksConnection = require('socksjs');
const fixieURL = process.env.FIXIE_SOCKS_HOST;
const fixieValues = fixieURL.split(new RegExp('[/(:\\/@)/]+'));

const mysqlServer = {
    host: '34.94.232.187',
    port: 3306
};

const fixieConnection = new SocksConnection(mysqlServer, {
    user: fixieValues[0],
    pass: fixieValues[1],
    host: fixieValues[2],
    port: fixieValues[3],
});

const mysqlConnPool = mysql.createPool({
    user: 'root',
    password: `${process.env.CLOUD_SQL_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    stream: fixieConnection
});

module.exports = mysqlConnPool;