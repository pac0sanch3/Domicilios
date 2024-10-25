import { axiosCliente } from "../../service/api/axios";

import { useState } from "react";

export const useRegistrarUsuario = () => {
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  const registrarUsuario = async (usuario) => {
    setLoadind(true);
    try {
      const res = await axiosCliente.post("user/registrar", usuario);

      return res.data;
    } catch (error) {
      setError(error.response);
      setLoadind(false);
      throw error;
    } finally {
      setLoadind(false);
    }
  };

  return {
    registrarUsuario,
    loading,
    error,
  };
};
