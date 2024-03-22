const Todos = require("../models/Todo.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const todos = new Todos({
        title: req.body.title,
        completed: req.body.completed || false
    });

    Todos.create(todos, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Todos."
            });
        }
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
   const title = req.query.title;

    Todos.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Todos."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Todos.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todos with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Todo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.getAllCompleted = (req, res) => {
  Todos.getAllCompleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todos."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Todos.updateById(
    req.params.id,
    new Todos(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Todos.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Todo with id " + req.params.id
        });
      }
    } else res.send({ message: `Todo was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Todos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todos."
      });
    else res.send({ message: `All Todo were deleted successfully!` });
  });
};