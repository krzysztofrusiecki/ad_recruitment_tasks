const db = require("../config/db");
const Todo = db.todos;

const getTodos = async (req, res) => {
  if (!req.isAuth) return res.status(400).json({ msg: "Access Denied" });
  const userId = req.id;
  try {
    const todos = await Todo.findAll({ where: { userId } });
    if (!todos) throw Error("No todos");
    return res.status(200).json(todos);
  } catch (err) {
    console.log(new Date().toISOString() + " " + err);
    return res.status(400).json({ msg: err.message });
  }
};

const createTodo = async (req, res) => {
  if (!req.isAuth) return res.status(400).json({ message: "Access Denied" });
  const userId = req.id;
  const { title, deadline } = req.body;
  try {
    let todo = await Todo.create({
      title,
      checked: false,
      deadline,
      userId,
    });
    if (!todo) throw Error("Something went wrong saving the todo");
    console.log(`CREATE:\t${todo}`);
    return res.status(200).json({
      id: todo.id,
      title: todo.title,
      checked: todo.checked,
      deadline: todo.deadline,
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

const updateTodo = async (req, res) => {
  if (!req.isAuth) return res.status(400).json({ message: "Access Denied" });
  const userId = req.id;
  const id = req.params.id;
  const { title, checked, deadline } = req.body;
  try {
    const todo = await Todo.update(
      { title, checked, deadline },
      { where: { id, userId } }
    );
    if (!todo) throw Error("Something went wrong while updating the todo");
    return res.status(200).json({
      id: todo.id,
      title: todo.title,
      checked: todo.checked,
      deadline: todo.deadline,
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

const deleteTodo = async (req, res) => {
  if (!req.isAuth) return res.status(400).json({ message: "Access Denied" });
  const userId = req.id;
  const id = req.params.id;
  try {
    const todo = await Todo.destroy({ where: { id, userId } });
    if (!todo) throw Error("Something went wrong while deleting the todo");
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
