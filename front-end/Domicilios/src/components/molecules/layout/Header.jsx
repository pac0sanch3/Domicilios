import PropTypes from "prop-types";
import { V } from "../../../index";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Header = ({ color, contenido }) => {
  return (
    <header
      className={`inset-x-0 top-0 h-16 md:px-8 sm:px-8 max-sm:px-8 ${color} z-50`}
    >
      <nav
        className="flex items-center justify-between  lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <figure className="h-full w-24 ">
            <LazyLoadImage
              src={V.logoTic}
              className="h-full w-full cursor-pointer"
              effect="opacity"
              alt="logo-sena"
            />
          </figure>
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-green-600 tracking-wide">
            MachinApp
          </div>
        </div>
        {contenido}
      </nav>
    </header>
  );
};

Header.propTypes = {
  color: PropTypes.string,
  contenido: PropTypes.element,
};
