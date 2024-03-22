const sql = require("./index.js");

class Todos {
    constructor(todo) {
        this.title = todo.title;
        this.completed = todo.completed;
    }
    static create(newTodo, result) {
        sql.query("INSERT INTO Todos SET ?", newTodo, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created Todo: ", {
                id: res.insertId,
                ...newTodo
            });
            result(null, {
                id: res.insertId,
                ...newTodo
            });
        });
    }
    static findById(id, result) {
        sql.query(`SELECT * FROM Todos WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("Found the todo: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        });
    }
    static getAll(title, result) {
        let query = "SELECT * FROM Todos";

        if (title) {
            query += ` WHERE title LIKE '%${title}%'`;
        }

        sql.query(query, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Todos: ", res);
            result(null, res);
        });
    }
    static getAllCompleted(result) {
        sql.query("SELECT * FROM Todos WHERE completed=true", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Todos: ", res);
            result(null, res);
        });
    }
    static updateById(id, todo, result) {
        sql.query(
            "UPDATE Todos SET title = ?, completed = ? WHERE id = ?",
            [todo.title, todo.completed, id],
            (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("Todo updated: ", { id: id, ...todo });
                result(null, { id: id, ...todo });
            }
        );
    }
    static remove(id, result) {
        sql.query("DELETE FROM Todos WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Deleted tutorial with id: ", id);
            result(null, res);
        });
    }
    static removeAll(result) {
        sql.query("DELETE FROM Todos", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log(`deleted ${res.affectedRows} Todos`);
            result(null, res);
        });
    }
}

module.exports = Todos;