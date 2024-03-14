const mysql = require("mysql2");
const config = require("../config/db.config");

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB
});

connection.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database.");
})

module.exports = connection;