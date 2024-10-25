import { axiosCliente } from "./axios";
import { useNavigate } from "react-router-dom";

export const useAxioshttpErrorStatus = () => {
  const navigate = useNavigate();
  axiosCliente.interceptors.response.use(
    (res) => res,
    (error) => {
      const { status } = error.response;
      switch (status) {
        case 403:
          navigate("/");

          break;

       /*  case 404:
          console.error("/not-found");
          break; */

        case 500:
          console.error("/server-error");
          break;
      }
      return Promise.reject(error);
    }
  );
};
