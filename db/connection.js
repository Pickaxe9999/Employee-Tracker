const mysql = require('mysql2');


//connection to the mysql db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Kingdom_01',
        database: 'employeeDB'
    },
    console.log('connected to the DB')
)

module.exports = db;