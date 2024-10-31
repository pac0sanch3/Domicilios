import axios from 'axios';

const API_URL = 'http://localhost:3000/novedad';

export const novedadesService = {
  getNovedad: async () => {
    return await axios.get(API_URL);
  },
  updateNovedad: async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data);
  },
  createNovedad: async (data) => {
    return await axios.post(API_URL, data);
  },
  deleteNovedad: async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  },
};
