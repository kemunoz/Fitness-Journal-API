const mysql = require('mysql');


const connection = mysql.createPool({
    host: '34.94.232.187',
    user: 'root',
    password: `${process.env.CLOUD_SQL_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`
});

module.exports = connection;