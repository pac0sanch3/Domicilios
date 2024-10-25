import { useState } from "react";
import { axiosCliente } from "../../service/api/axios";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (data, id) => {
    setLoading(true); // Establecer loading a true al inicio
    setError(null); // Limpiar errores previos
    try {
      const res = await axiosCliente.put(`user/actualizar/${id}`, data);

      return res.data;
    } catch (errores) {
      setError(errores.response ? errores.response.data : "An error occurred"); // Manejo del erro
      throw errores;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
