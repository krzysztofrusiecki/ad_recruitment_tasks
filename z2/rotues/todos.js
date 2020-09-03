const { Router } = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/Todos");

const router = Router();

// @desc    Get all todos
// @route   GET /todos
router.get("/", getTodos);

// @desc    Create todo
// @route   POST /todos
router.post("/", createTodo);

// @desc    Update todo
// @route   PUT /todos/:id
router.put("/:id", updateTodo);

// @desc    Delete todo
// @route   DELETE /todos/:id
router.delete("/:id", deleteTodo);

module.exports = router;
