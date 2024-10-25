import { useEffect } from "react";
import { Layout, FormUserUpdate } from "../../index";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateUserAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resultadoUsuario = location.state?.resultadoUsuario;

  useEffect(() => {
    if (!resultadoUsuario) {
      navigate("/Panelcontrol");
    }
  }, [resultadoUsuario, navigate]);

  if (!resultadoUsuario) {
    return <div>{("loading")}</div>;
  }

  const DataUser = {
    id: resultadoUsuario.idUsuarios,
    nombre: resultadoUsuario.us_nombre,
    apellidos: resultadoUsuario.us_apellidos,
    correo: resultadoUsuario.us_correo,
    tipo_documento: resultadoUsuario.us_tipo_documento,
    numero_documento: resultadoUsuario.us_numero_documento,
    empresa: resultadoUsuario.us_empresa,
    especialidad: resultadoUsuario.us_especialidad,
    rol: resultadoUsuario.rol_nombre,
    id_rol: resultadoUsuario.fk_roles,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={DataUser} />
      </Layout>
    </>
  );
};
