import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Imagenes = ({ rutaImg }) => {
  //Pasar ruta a partir de la carpeta public

  const imgRuta = rutaImg;

  const [imagen, setImagen] = useState(
    `${import.meta.env.VITE_API_IMAGE}imagenes/noEncontrada.jpg`
  );

  useEffect(() => {
    const verificarImg = async () => {
      let url = `${import.meta.env.VITE_API_IMAGE}${imgRuta}`;

      const response = await fetch(url);

      if (response.ok) {
        setImagen(url);
      }
    };
    verificarImg();
  }, [imgRuta]);

  return (
    <>
      <img className="w-full rounded-2xl object-cover" src={imagen} alt="" />
    </>
  );
};

Imagenes.propTypes = {
  rutaImg: PropTypes.string.isRequired,
};
