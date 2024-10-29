import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex">
      <div
        className="
          transform top-0 left-0 w-64 bg-gray-800 text-white h-full fixed
          transition-transform duration-300 ease-in-out
          flex flex-col justify-between
        "
      >
        {/* Sección superior del menú */}
        <div>
          <div className="p-6 text-lg font-semibold border-b border-gray-700">
            Menú de Navegación
          </div>
          <ul className="p-4 space-y-2">
            <li className="p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/Home">Home</Link>
            </li>
          </ul>
        </div>

        {/* Enlace de Panel de Control en la parte inferior */}
        <div className="p-4">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">
            <Link to="/PanelDeControl">Panel De Control</Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Nav;