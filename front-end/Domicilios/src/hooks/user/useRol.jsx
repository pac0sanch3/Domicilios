import { axiosCliente, useAuth } from "../../index";
import { useState, useEffect } from "react";

export const useFetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  const { rol, user } = useAuth();
  const refreshRol = async () => {
    await fetchRoles();
  };

  const fetchRoles = async () => {
    try {
      const res = await axiosCliente.get("rol/listar");

      setRoles(res.data);
    } catch (error) {
      setError(error.response);
      setLoadind(false);
    } finally {
      setLoadind(false);
    }
  };
  useEffect(() => {
    if (rol === "Administrador" && user) fetchRoles();
  }, [rol, user]);

  return {
    roles,
    refreshRol,
    loading,
    error,
  };
};

// registrar roles

export const useRegistrarRol = () => {
  const registrarRol = async (data) => {
    try {
      await axiosCliente.post("rol/registrar", data);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return {
    registrarRol,
  };
};
