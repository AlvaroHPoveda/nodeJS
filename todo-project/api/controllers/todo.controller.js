const { json } = require('express/lib/response');
const { ToDo } = require('../models/todo.model');
const { filterObj } = require('../utils/filterObj');

//Get all ToDo

exports.getallToDo = async (req, res) => {
  try {
    const ToDos = await ToDo.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: { ToDos }
    });
  } catch (error) {
    console.log(error);
  }
};

// Save new ToDo

exports.createNewToDo = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400),
        json({
          status: 'error',
          menssage: 'Must provide a valid name, email and password'
        });
      return;
    }

    //Must encrypt password
    const newToDo = await ToDo.create({
      content
    });

    res.status(201).json({
      status: 'sucess',
      data: { newToDo }
    });
  } catch (error) {
    console.log(error);
  }
};

// Patch ToDo

exports.updateToDoPatch = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body,'content'); 

    const todo = await ToDo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update todo, invalid ID'
      });
      return;
    }

    await todo.update({ ...data }); 

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

// Delete ToDo
exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await ToDo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete todo, invalid ID'
      });
      return;
    }

    await todo.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
