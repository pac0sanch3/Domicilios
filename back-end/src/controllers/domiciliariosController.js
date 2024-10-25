import { conexion } from "../databases/conexion.js";

export const registrarDomiciliario = async (req, res) => {
    try {
      const { id_usuario, licencia_vehiculo, disponibilidad } = req.body;
      const sql = `INSERT INTO domiciliarios (id_usuario, licencia_vehiculo, disponibilidad)
                   VALUES (?, ?, ?)`;
  
      const [results] = await conexion.query(sql, [
        id_usuario, 
        licencia_vehiculo, 
        disponibilidad || 'disponible' // Valor por defecto 'disponible'
      ]);
      
      res.status(201).json({ message: 'Domiciliario registrado exitosamente', id: results.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar el domiciliario', details: err });
    }
  };
  
  // Listar todos los domiciliarios
export const listarDomiciliarios = async (req, res) => {
    try {
      const sql = `SELECT * FROM domiciliarios`;
      const [results] = await conexion.query(sql);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: 'Error al listar domiciliarios', details: err });
    }
  };
  
  // Actualizar un domiciliario
export const actualizarDomiciliario = async (req, res) => {
    try {
      const { id_domiciliario } = req.params;
      const { id_usuario, licencia_vehiculo, disponibilidad } = req.body;
      
      const sql = `UPDATE domiciliarios SET 
                     id_usuario = ?, 
                     licencia_vehiculo = ?, 
                     disponibilidad = ?, 
                     fecha_actualizacion = CURRENT_TIMESTAMP
                   WHERE id_domiciliario = ?`;
  
      const [results] = await conexion.query(sql, [
        id_usuario, 
        licencia_vehiculo, 
        disponibilidad, 
        id_domiciliario
      ]);
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }
      
      res.status(200).json({ message: 'Domiciliario actualizado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el domiciliario', details: err });
    }
  };
  
  // Eliminar un domiciliario
export const eliminarDomiciliario = async (req, res) => {
    try {
      const { id_domiciliario } = req.params;
      const sql = `DELETE FROM domiciliarios WHERE id_domiciliario = ?`;
  
      const [results] = await conexion.query(sql, [id_domiciliario]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }
      
      res.status(200).json({ message: 'Domiciliario eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el domiciliario', details: err });
    }
  };