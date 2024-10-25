import { axiosCliente } from "../../service/api/axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useFetchUserData = () => {
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  /*   const [error, setError] */

  const { rol, user } = useAuth();

  const fetcDataUser = async () => {
    try {
      const res = await axiosCliente.get("/user/listar");
      setDataUser(res.data);
    } catch (error) {
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rol.trim().toLowerCase().startsWith("administrador") && user) {
      fetcDataUser();
    }
    return;
  }, [rol, user]);

  return { dataUser, loading, fetcDataUser };
};
