import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

const todoService = {
  getAllTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  getTodo: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },

  createTodo: async (todo) => {
    try {
      const response = await axios.post(API_URL, todo);
      return response.data.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  updateTodo: async (id, todo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, todo);
      return response.data.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  toggleTodo: async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/toggle`);
      return response.data.data;
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  }
};

export default todoService;
