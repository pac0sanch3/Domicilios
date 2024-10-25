import { axiosCliente } from "../service/api/axios";

// Función para enviar datos en formato multipart/form-data
// como lo son imagenes y archivos
/**
 * Descripción de la función.
 * Esta función funcion permitira crear un objeto, para poder enviar datos tipo "multipart/form-data"
 *
 * @param {tipo} url - url de endpoint .
 * @param {tipo} datos - objeto que se enviara a la api.
 * @param {tipo} metodo - tipo de metodo [POST, PUT]
 * @returns {tipo} .
 */

export const multiFormData = (url, datos, metodo) => {
  const data = new FormData();

  // Agregar los datos al FormData, con su respectiva clave y valor
  Object.entries(datos).forEach(([key, value]) => {
    data.append(key, value);
  });
  return axiosCliente({
    url,
    method: metodo,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
