const express = require('express');

const router = express.Router();

//controllers
const { getallToDo, createNewToDo, deleteToDo, updateToDoPatch } = require('../controllers/todo.controller');

router.get('/', getallToDo);

router.post('/', createNewToDo)

router.patch('/:id', updateToDoPatch);

router.delete('/:id', deleteToDo);

module.exports = { todoRouter: router };
