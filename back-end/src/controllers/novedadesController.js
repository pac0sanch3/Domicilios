import { conexion } from "../databases/conexion.js";

  // Registrar una novedad
export const registrarNovedad = async (req, res) => {
    try {
      const { id_domiciliario, id_solicitud, descripcion, ubicacionActual } = req.body;
      const sql = `INSERT INTO novedades (id_domiciliario, id_solicitud, descripcion, estado, fecha_reporte, ubicacionActual)
                   VALUES (?, ?, ?, ?, ?, ?)`;

      const [results] = await conexion.query(sql, [id_domiciliario, id_solicitud, descripcion, 'pendiente', new Date(), ubicacionActual]);
      
      console.log(results)

      res.status(201).json({ message: 'Novedad registrada exitosamente', id: results.insertId });
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
  
      const sql = `UPDATE novedades SET id_domiciliario = ?, id_solicitud = ?, descripcion = ?, estado = ?, fecha_reporte = ?, 
                   fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_novedad = ?`;
  
      const [results] = await conexion.query(sql, [id_domiciliario, id_solicitud, descripcion, estado, fecha_reporte, id_novedad]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Novedad no encontrada' });
      }
      res.status(200).json({ message: 'Novedad actualizada exitosamente' });
    } catch (err) {
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