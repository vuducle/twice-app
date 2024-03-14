module.exports = app => {
    const todos = require("../controllers/Todo.js");

    let express = require("express");
    let router = express();

    router.post("/", todos.create);

    router.get("/", todos.findAll);

    router.get("/completed", todos.getAllCompleted);

    router.get("/:id", todos.findOne);

    router.put("/:id", todos.update);

    router.delete("/:id", todos.delete);

    router.delete("/", todos.deleteAll);

    app.use("/api/todos", router);
}