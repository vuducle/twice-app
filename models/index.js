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

    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS Todos (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        title varchar(255),
        completed BOOLEAN DEFAULT false
    );`;

    connection.query(CREATE_TABLE, (err, result) => {
        if (err) throw err;
        console.log("Created Table: ", result);
    })
})

module.exports = connection;