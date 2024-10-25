import { Header, Footer, ModalComponte, V, Login } from "../../index";
import PropTypes from "prop-types";

export const LayotuInicio = ({ children }) => {
  return (
    <>
      <div className="h-screen">
        <Header
          color={"bg-white"}
          contenido={
            <ModalComponte
              buttonModal={("iniciar_sesion")}
              tittleModal={("iniciar_sesion")}
              colorButton={V.BtnRegistrar}
              size={"sm"}
              componente={<Login />}
            />
          }
        />
        {children}
      </div>
      <Footer />
    </>
  );
};

LayotuInicio.propTypes = {
  children: PropTypes.node,
};
