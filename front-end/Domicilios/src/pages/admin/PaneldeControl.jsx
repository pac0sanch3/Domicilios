
import { Layout, ListarUsuarios, Breadcrumb } from "../../index";

export const PaneldeControlUsuarios = () => {

  return (
    <>
      <Layout>
        <Breadcrumb pageName={("listado_usuarios")} />
        <ListarUsuarios />
      </Layout>
    </>
  );
};
