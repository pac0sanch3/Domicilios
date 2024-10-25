// componentes para los iconos
import PropTypes from "prop-types";
export const Icons = ({ icon: Icon }) => {
  return (
    <>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </>
  );
};

Icons.propTypes = {
  icon: PropTypes.any,
};
