const express = require('express');
const todosRoutes = express.Router();
todosRoutes.use(express.json());
const fs = require('fs');

// C
todosRoutes.post('/todos', function (req, res) {
    const taskName = req.body.name;

    const allTodos = JSON.parse(fs.readFileSync('data/todo.json', 'utf8'));
    const lastId = JSON.parse(fs.readFileSync('data/lastId.json', 'utf8'));
    const newTask = {};

    newTask.id = (lastId[0].lastid + 1);
    newTask.name = taskName;
    newTask.status = false;

    allTodos.push(newTask);

    fs.writeFile('data/todo.json', JSON.stringify(allTodos), function (err) {
        if (!err) {
            return res.status(201).json(allTodos);
        } else {
            console.log("Error: " + err);
            return err;
        }
    });

    lastId[0].lastid = newTask.id;
    fs.writeFile('data/lastId.json', JSON.stringify(lastId), function (err) {
        if (!err) {
            console.log(lastId);
        } else {
            console.log('Error: ' + err);
        }
    });
    // }
});

// R
todosRoutes.get("/todos", (req, res) => {
    const allTodos = JSON.parse(fs.readFileSync('data/todo.json', 'utf8'));
    return res.status(200).json(allTodos);
});

// U
todosRoutes.put("/todos", (req, res) => {
    const { id, name, status } = req.body;

    if (!id) {
        return res.status(400).json("ID is mandatory!");
    }

    const allTodos = JSON.parse(fs.readFileSync('data/todo.json', 'utf8'));
    const taskToBeUpdated = allTodos.find((el) => el.id === parseInt(id));

    if (!taskToBeUpdated) {
        return res.status(404).json("ID is not exist")
    }

    const taskToBeUpdatedIndex = allTodos.indexOf(taskToBeUpdated);
    allTodos[taskToBeUpdatedIndex].name = name;
    allTodos[taskToBeUpdatedIndex].status = status;

    fs.writeFile('data/todo.json', JSON.stringify(allTodos), function (err) {
        if (!err) {
            res.json(allTodos);
        } else {
            console.log('Error: ' + err);
            res.send(err);
        }
    });
});

//D
todosRoutes.delete("/todos/:id", (req, res) => {
    const { id } = req.params;

    const allTodos = JSON.parse(fs.readFileSync('data/todo.json', 'utf8'));
    const taskToBeDeleted = allTodos.find((el) => el.id === parseInt(id));

    if (!taskToBeDeleted) {
        return res.status(404).json("ID is not exist")
    }

    const taskToBeUpdatedIndex = allTodos.indexOf(taskToBeDeleted);
    allTodos.splice(taskToBeUpdatedIndex, 1);

    fs.writeFile('data/todo.json', JSON.stringify(allTodos), function (err) {
        if (!err) {
            res.json(allTodos);
        } else {
            console.log('Error: ' + err);
            res.send(err);
        }
    });

});

module.exports = todosRoutes;