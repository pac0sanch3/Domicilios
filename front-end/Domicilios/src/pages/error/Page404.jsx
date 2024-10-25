import { Layout, useAuth, LayotuInicio } from "../../index";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export const Page404 = () => {
  const { user } = useAuth();

  // eslint-disable-next-line react/prop-types
  const Componente404 = ({ link }) => {
    return (
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Página no encontrada.
                </h1>
                <p className="my-2 text-gray-800">
                  Parece que el enlace no es correcto
                </p>
                <Button color="primary" size="lg">
                  <Link
                    className="h-full w-full flex justify-center items-center"
                    to={link}
                  >
                    Volver al inicio
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    );
  };

  const comprobar =
    user.length === 0 ? (
      <LayotuInicio>{<Componente404 link={"/"} />}</LayotuInicio>
    ) : (
      <Layout>
        <Componente404 link={"/home"} />
      </Layout>
    );

  return comprobar;
};
