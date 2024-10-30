import axios from 'axios';

const API_URL = 'http://localhost:3000/negocio';

export const NegocioService = {
  // Obtener todos los Negocio
  getNegocio: () => {
    return axios.get(`${API_URL}/listar`);
  },

  // Obtener un Negocio específico
  getNegocioid: (id) => {
    return axios.get(`${API_URL}/listar/${id}`);
  },

  // Crear un nuevo Negocio
  createNegocio: (NegocioData) => {
    return axios.post(`${API_URL}/registrar-negocio`, NegocioData);
  },

  // Actualizar un Negocio existente
  updateNegocio: (id, NegocioData) => {
    return axios.put(`${API_URL}/actualizar/${id}`, NegocioData);
  },

  // Eliminar un Negocio
  deleteNegocio: (id) => {
    return axios.delete(`${API_URL}/eliminar/${id}`);
  }
};
