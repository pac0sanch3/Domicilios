import { Layout, useAuth, FormUserUpdate } from "../../index";


export const PerfilSettings = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  const newDataUser = {
    id: user.idUsuarios,
    nombre: user.us_nombre,
    apellidos: user.us_apellidos,
    correo: user.us_correo,
    tipo_documento: user.us_tipo_documento,
    numero_documento: user.us_numero_documento,
    imagen: user.us_imagen,
    empresa: user.us_empresa,
    especialidad: user.us_especialidad,
    rol: user.rol_nombre,
    id_rol: user.idRoles,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={newDataUser} />
      </Layout>
    </>
  );
};
