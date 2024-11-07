import { conexion } from "../databases/conexion.js";

  // Registrar una novedad
export const registrarNovedad = async (req, res) => {
    try {
      const { id_domiciliario, id_solicitud, descripcion, ubicacionActual } = req.body;
      const sql = `INSERT INTO novedades (id_domiciliario, id_solicitud, descripcion, estado, fecha_reporte, ubicacionActual)
                   VALUES (?, ?, ?, ?, ?, ?)`;

      const [results] = await conexion.query(sql, [id_domiciliario, id_solicitud, descripcion, 'resuelta', new Date(), ubicacionActual]);


      console.log(results.insertId)

      let idNovedad = results.insertId

      /* Tenemos que reasignar el pedido */
      /* consulta para encontrar los domiciliarios disponibles */
      let sqlDomiciliarios = ` 
      SELECT DISTINCT d.*
      FROM usuarios u
      INNER JOIN domiciliarios d ON u.id_usuario = d.id_usuario
      WHERE d.disponibilidad = 'disponible'
      AND u.tipo_usuario = 'domiciliario'
      AND (
          NOT EXISTS (
              SELECT 1 
              FROM solicitudes s 
              WHERE s.id_domiciliario = d.id_domiciliario
          )
          OR 
          EXISTS (
              SELECT 1
              FROM solicitudes s
              WHERE s.id_domiciliario = d.id_domiciliario
              AND s.estado NOT IN ('en_curso', 'reprogramado')
              GROUP BY s.id_domiciliario
              HAVING COUNT(*) = (
                  SELECT COUNT(*)
                  FROM solicitudes
                  WHERE id_domiciliario = d.id_domiciliario
              )
          )
      )
      AND (
          NOT EXISTS (
              SELECT 1 
              FROM novedades n 
              WHERE n.id_domiciliario = d.id_domiciliario
          )
          OR 
          EXISTS (
              SELECT 1
              FROM novedades n
              WHERE n.id_domiciliario = d.id_domiciliario
              AND n.estado = 'resuelta'
              GROUP BY n.id_domiciliario
              HAVING COUNT(*) = (
                  SELECT COUNT(*)
                  FROM novedades
                  WHERE id_domiciliario = d.id_domiciliario
              )
          )   
      );
      `

      const [domiciliariosDis] = await conexion.query(sqlDomiciliarios)


      if (domiciliariosDis.length >0){
        let pocicionAleatoria = Math.floor(Math.random() * domiciliariosDis.length)

        const domiciliario = domiciliariosDis[pocicionAleatoria]

        const idDomiciliarioSelec= domiciliario.id_domiciliario

        //actualizamos la solicitud
        let sql = `update solicitudes set  estado ='reprogramado', id_domiciliario=${idDomiciliarioSelec} where id_solicitud = ${id_solicitud}`

        const [response] = await conexion.query(sql)

        if (response.affectedRows>0){
            
            //si si actualiza la solicitud actualizamos la novedad. 
            let sql = `update novedades set estado  = 'resuelta'  where id_novedad = ${idNovedad}`

            const [response] = await conexion.query(sql)


            //y actualizamos el estado del domiciliario. 
            let sqlDomiciliario = `update domiciliarios set disponibilidad ='no_disponible' where id_domiciliario = ${id_domiciliario}`

            const [respuestDom] = await conexion.query(sqlDomiciliario)


            return res.status(200).json({"mensaje":"Se reasigno correctamente el pedido"})
            


        }else{
            return res.status(404).json({"mensaje":"Error, no se reasigno correctamente el pedido"})
        }
    }
    else{
        return res.status(404).json({"mensaje":"No se encontraron domiciliarios disponibles, intentar mas tarde"})
    }
    


      //res.status(201).json({ message: 'Novedad registrada exitosamente', id: results.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar la novedad', details: err });
    }
  }

  
  
  // Listar novedades
export const listarNovedad = async (req, res) => {
    try {
      const sql = `SELECT * FROM novedades`;
      const [results] = await conexion.query(sql);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: 'Error al listar novedades', details: err });
    }
  };
  
  // Actualizar una novedad
  export const actualizarNovedad = async (req, res) => {
    try {
        const { id_novedad } = req.params;
        const { id_domiciliario, id_solicitud, descripcion, estado, fecha_reporte } = req.body;
  
        // Validar que los campos requeridos estén presentes
        if (!id_domiciliario || !id_solicitud || !descripcion || !estado || !fecha_reporte) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
  
        // Verificar si la novedad existe
        const checkSql = `SELECT * FROM novedades WHERE id_novedad = ?`;
        const [checkResult] = await conexion.query(checkSql, [id_novedad]);
  
        if (checkResult.length === 0) {
            return res.status(404).json({ message: 'Novedad no encontrada' });
        }
  
        const sql = `UPDATE novedades SET id_domiciliario = ?, id_solicitud = ?, descripcion = ?, estado = ?, fecha_reporte = ? WHERE id_novedad = ?`;
        const [results] = await conexion.query(sql, [id_domiciliario, id_solicitud, descripcion, estado, fecha_reporte, id_novedad]);
  
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Novedad no encontrada' });
        }
  
        res.status(200).json({ message: 'Novedad actualizada exitosamente' });
    } catch (err) {
        console.error('Error al actualizar la novedad:', err);
        res.status(500).json({ error: 'Error al actualizar la novedad', details: err });
    }
  };
  
  // Eliminar una novedad
export const eliminarNovedad = async (req, res) => {
    try {
      const { id_novedad } = req.params;
      const sql = `DELETE FROM novedades WHERE id_novedad = ?`;
  
      const [results] = await conexion.query(sql, [id_novedad]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Novedad no encontrada' });
      }
      res.status(200).json({ message: 'Novedad eliminada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar la novedad', details: err });
    }
  };


  /* actualizar estado de la novedad */

export const actEstadoNovedad = async (req, res) =>{
  
  try{
    const {idNovedad} = req.params

    const {estado} = req.body

    let sql = `update novedades set estado  = '${estado}'  where id_novedad = ${idNovedad}`

    const [response] = await conexion.query(sql)

    console.log(response)

    return res.status(200).json({"mensaje":"Se actualizo con exito"})


  }catch(error){
    return res.status(500).json({"mensaje":"Error en el servidor", error})
  }
}
