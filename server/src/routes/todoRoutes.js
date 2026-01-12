const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController');

// Get all todos
router.get('/', getAllTodos);

// Get single todo
router.get('/:id', getTodo);

// Create todo
router.post('/', createTodo);

// Update todo
router.put('/:id', updateTodo);

// Toggle todo completion
router.patch('/:id/toggle', toggleTodo);

// Delete todo
router.delete('/:id', deleteTodo);

module.exports = router;
