const mysql = require('mysql');


const connection = mysql.createPool({
    host: '34.94.232.187',
    user: 'root',
    password: 'Km709997341!',
    database: 'FitnessJournal'
});

module.exports = connection;