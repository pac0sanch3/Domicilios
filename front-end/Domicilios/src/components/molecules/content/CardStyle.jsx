import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useState, useEffect } from 'react'
// solo se va a trabajar con este componentes para las Cards
// eslint-disable-next-line react/prop-types
export const CardStyle = ({imagen, bodyContent, titleCard, subtitle, link, nameLink, children, footer}) => {
  const [estadoImg, setEstadoImg] = useState(false);

  useEffect(() => {
    const verificarImagen = async () => {
      if (imagen) {
        const rutaImagen = `${import.meta.env.VITE_API_IMAGE}${imagen}`;
        try {
          const response = await fetch(rutaImagen);
          setEstadoImg(response.ok);
        } catch (error) {
          setEstadoImg(false);
        }
      } else {
        setEstadoImg(false);
      }
    };

    verificarImagen();
  }, [imagen]);

  return (
    <Card radius="">
      <CardHeader className="p-4 flex flex-col items-start">
        <p className="text-xs uppercase font-semibold text-green-600 dark:text-purple-400">
          {subtitle}
        </p>
        <span className="font-bold text-lg text-gray-800 dark:text-white">
          {titleCard}
        </span>
      </CardHeader>

      <CardBody className="px-5 py-2 flex justify-center">
        {imagen && (
          <Image
            alt="Card background"
            className="object-cover w-full h-48 rounded-lg transition-transform duration-300 hover:scale-105"
            src={
              estadoImg
                ? `${import.meta.env.VITE_API_IMAGE}${imagen}`
                : `${import.meta.env.VITE_API_IMAGE}imagenes/noEncontrada.jpg`
            }
            width={270}
            height={210}
          />
        )}
        {bodyContent}

        {children && (
          <div className="mt-3 text-gray-600 dark:text-gray-300">
            {children}
          </div>
        )}
      </CardBody>

      <CardFooter className="px-5 py-3 flex flex-col justify-between items-center border-gray-200 dark:border-gray-700">
        {
          nameLink && (<> <Link
            to={link}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 transition-colors duration-300"
          >
            {nameLink}
          </Link></>)
        }
       
        {footer && (<>{footer}</>)}
      </CardFooter>
    </Card>
  );
};

