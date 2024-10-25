import axios from 'axios';

const API_URL = 'http://localhost:3000/insidencias';

export const IncidenciasService = {
  // Obtener todos los usuarios
  getIncidencias: () => {
    return axios.get(`${API_URL}/listar`);

    
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