import axios from 'axios';

const API_URL = 'http://localhost:3000/usuario';

export const userService = {
  // Obtener todos los usuarios
  getUsers: () => {
    return axios.get(`${API_URL}/user`);
  },

  // Obtener un usuario específico
  getUser: (id) => {
    return axios.get(`${API_URL}/user/${id}`);
  },

  // Crear un nuevo usuario
  createUser: (userData) => {
    return axios.post(`${API_URL}/registrar`, userData);
  },

  // Actualizar un usuario existente
  updateUser: (id, userData) => {
    return axios.put(`${API_URL}/actualizar/${id}`, userData);
  },

  // Eliminar un usuario
  deleteUser: (id) => {
    return axios.delete(`${API_URL}/eliminar/${id}`);
  }
};