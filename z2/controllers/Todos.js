const db = require("../config/db");
const Todo = db.todos;

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const createTodo = async (req, res) => {
  const { title, checked, deadline } = req.body;
  console.log(Todo);
  try {
    let todo = Todo.create({
      title,
      checked,
      deadline,
    });
    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, checked, deadline } = req.body;
  try {
    const todo = await Todo.update(
      { title, checked, deadline },
      { where: { id } }
    );
    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.destroy({ where: { id } });
    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
