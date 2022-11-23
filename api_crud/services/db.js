const mysql = require("mysql");


// Connection DB

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "carlosloco123",
    database: "db_prueba"
});

conn.connect();


module.exports = conn;