import axios from 'axios';

const API_URL = 'http://192.168.1.100:3000/domiciliario';

export const domiciliariosService = {
  getDomiciliarios: () => {
    return axios.get(`${API_URL}`);
  },

  createDomiciliario: (data) => {
    return axios.post(`${API_URL}`, data);
  },

  updateDomiciliario: (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
  },

  deleteDomiciliario: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },

  updateDisponibilidad: (id, disponibilidad) => {
    return axios.put(`${API_URL}/disponibilidad/${id}`, { disponibilidad });
  }
};