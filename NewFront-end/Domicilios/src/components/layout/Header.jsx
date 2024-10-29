import LogoutButton from '../navegacion/LogoutButton'; // Importar el componente de cierre de sesión

const Header = () => {
  return (
    <header className="inset-x-0 top-0 h-16 bg-white md:px-8 sm:px-8 max-sm:px-8 z-50">
      <nav className="flex items-center justify-between lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <figure className="h-full w-24 "></figure>
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-green-600 tracking-wide">
            Domicilios
          </div>
        </div>
        {/* Usar el componente de cierre de sesión */}
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
