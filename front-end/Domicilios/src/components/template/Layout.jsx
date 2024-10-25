import { Nav, useAuth, AvatarCom, Footer, Header, MenuMobile, V } from "../../index.js";
import { Suspense } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export const Layout = ({ children }) => {
  const { rol } = useAuth();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden">
        <Header color="bg-white shadow-sm" contenido={<AvatarCom />} />

        <main className="flex flex-grow overflow-hidden">
          <aside className="hidden lg:block w-64">
            <Nav rol={rol} />
          </aside>

          <section className="flex-grow p-4 sm:p-6 lg:p-8 overflow-auto">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              }
            >
              <div
                className={`bg-white ${V.radius} shadow-lg h-full p-4 sm:p-6`}
              >
                <div className="lg:hidden mb-4">
                  <MenuMobile />
                </div>
                {children}
              </div>
              <Outlet />
            </Suspense>
          </section>
        </main>

        <Footer className="shadow-md mt-auto p-4 sm:p-6" />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  titlePage: PropTypes.string,
};
