import { conexion } from "../databases/conexion.js";

export const registrarDomiciliario = async (req, res) => {
    try {
      const { id_usuario, licencia_vehiculo, disponibilidad } = req.body;
      
      // Validar que id_usuario sea un número
      if (!id_usuario || isNaN(id_usuario)) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
      }

      const sql = `INSERT INTO domiciliarios (id_usuario, licencia_vehiculo, disponibilidad)
                   VALUES (?, ?, ?)`;
  
      const [results] = await conexion.query(sql, [
        id_usuario, 
        licencia_vehiculo, 
        disponibilidad || 'disponible'
      ]);
      
      res.status(201).json({ 
        message: 'Domiciliario registrado exitosamente', 
        id: results.insertId 
      });
    } catch (err) {
      console.error('Error al registrar domiciliario:', err);
      res.status(500).json({ 
        error: 'Error al registrar el domiciliario', 
        details: err.message 
      });
    }
};
  
export const listarDomiciliarios = async (req, res) => {
    try {
      const sql = `SELECT * FROM domiciliarios`;
      const [results] = await conexion.query(sql);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error al listar domiciliarios:', err);
      res.status(500).json({ 
        error: 'Error al listar domiciliarios', 
        details: err.message 
      });
    }
};

export const listarDomiciliariosPorUsuario = async (req,res) => {
  try {
    const {id_usuario} = req.params;
    const sql = `SELECT disponibilidad FROM domiciliarios WHERE id_usuario = ${id_usuario}`

    console.log(sql)

    const [response] = await conexion.query(sql)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({'Error': 'Error en servidor', error})
  }
}
  
export const actualizarDomiciliario = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_usuario, licencia_vehiculo, disponibilidad } = req.body;
      
      // Validaciones
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de domiciliario inválido' });
      }
      
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
        id
      ]);
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }
      
      res.status(200).json({ message: 'Domiciliario actualizado exitosamente' });
    } catch (err) {
      console.error('Error al actualizar domiciliario:', err);
      res.status(500).json({ 
        error: 'Error al actualizar el domiciliario', 
        details: err.message 
      });
    }
};
  
export const eliminarDomiciliario = async (req, res) => {
    try {
      const { id } = req.params;

      // Validar ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de domiciliario inválido' });
      }

      const sql = `DELETE FROM domiciliarios WHERE id_domiciliario = ?`;
  
      const [results] = await conexion.query(sql, [id]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }
      
      res.status(200).json({ message: 'Domiciliario eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar domiciliario:', err);
      res.status(500).json({ 
        error: 'Error al eliminar el domiciliario', 
        details: err.message 
      });
    }
};

export const actualizarDisponibilidad = async (req, res) => {
  try {
      const { id } = req.params;

      // Validación del ID
      if (!id || isNaN(id)) {
          return res.status(400).json({ error: 'ID de domiciliario inválido' });
      }

      // Consulta para obtener el valor actual de disponibilidad
      const [domiciliario] = await conexion.query(
          `SELECT disponibilidad FROM domiciliarios WHERE id_domiciliario = ?`,
          [id]
      );

      // Verificar si el domiciliario existe
      if (!domiciliario || domiciliario.length === 0) {
          return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }

      // Obtener el valor actual y definir el siguiente estado
      const opcionesDisponibilidad = ['disponible', 'no_disponible'];
      const currentDisponibilidad = domiciliario[0].disponibilidad;
      const nextIndex = (opcionesDisponibilidad.indexOf(currentDisponibilidad) + 1) % opcionesDisponibilidad.length;
      const nextDisponibilidad = opcionesDisponibilidad[nextIndex];

      // Consulta SQL para actualizar la disponibilidad al siguiente estado
      const sql = `UPDATE domiciliarios SET 
                      disponibilidad = ?, 
                      fecha_actualizacion = CURRENT_TIMESTAMP
                   WHERE id_domiciliario = ?`;

      const [results] = await conexion.query(sql, [
          nextDisponibilidad, 
          id
      ]);

      // Verificación de resultados
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Domiciliario no encontrado' });
      }

      res.status(200).json({ 
          message: 'Disponibilidad del domiciliario actualizada exitosamente', 
          nuevaDisponibilidad: nextDisponibilidad 
      });
  } catch (err) {
      console.error('Error al actualizar disponibilidad:', err);
      res.status(500).json({ 
          error: 'Error al actualizar la disponibilidad del domiciliario', 
          details: err.message 
      });
  }
};

export const reportesDomiciliario = async (req, res) => {
  try {
    const { id_domiciliario, fecha_inicio, fecha_fin } = req.body;

    // Validar parámetros
    if (!id_domiciliario || isNaN(id_domiciliario)) {
      return res.status(400).json({ error: 'ID de domiciliario inválido' });
    }

    // 1. Obtener todas las solicitudes del domiciliario en el rango de fechas
    const sqlSolicitudes = `
      SELECT
        s.id_solicitud,
        s.direccion_recogida,
        s.direccion_entrega,
        s.estado AS estado_solicitud,
        s.fecha_creacion AS fecha_solicitud,
        u.nombre AS nombre_domiciliario, 
        u.telefono AS telefono_domiciliario,
        d.licencia_vehiculo,  -- Aquí agregamos el campo licencia_vehiculo
        COUNT(s.id_solicitud) OVER() AS total_solicitudes
      FROM solicitudes s
      LEFT JOIN domiciliarios d ON s.id_domiciliario = d.id_domiciliario
      LEFT JOIN usuarios u ON d.id_usuario = u.id_usuario
      WHERE s.id_domiciliario = ?
        AND s.fecha_creacion BETWEEN ? AND ?
      ORDER BY s.fecha_creacion DESC
    `;

    const [solicitudes] = await conexion.query(sqlSolicitudes, [id_domiciliario, fecha_inicio, fecha_fin]);

    if (solicitudes.length === 0) {
      return res.status(404).json({ error: 'No se encontraron solicitudes para este domiciliario en el rango de fechas' });
    }

    // 2. Obtener todas las novedades asociadas a las solicitudes
    const sqlNovedades = `
      SELECT
        n.id_solicitud,
        n.descripcion AS novedad_descripcion,
        n.estado AS novedad_estado,
        n.fecha_reporte,
        n.ubicacionActual
      FROM novedades n
      WHERE n.id_solicitud IN (${solicitudes.map(s => s.id_solicitud).join(',')})
      ORDER BY n.fecha_reporte DESC
    `;

    const [novedades] = await conexion.query(sqlNovedades);

    // 3. Agrupar novedades por solicitud
    const solicitudesConNovedades = solicitudes.map(solicitud => {
      const novedadesSolicitud = novedades.filter(nov => nov.id_solicitud === solicitud.id_solicitud);
      return {
        ...solicitud,
        novedades: novedadesSolicitud
      };
    });

    // 4. Responder con el reporte generado
    res.status(200).json({
      message: 'Reporte de domiciliario generado',
      data: solicitudesConNovedades,
      total_solicitudes: solicitudesConNovedades.length,
    });

  } catch (err) {
    console.error('Error al generar reporte de domiciliario:', err);
    res.status(500).json({
      error: 'Error al generar reporte',
      details: err.message,
    });
  }
};

export const reportesVentas = async (req, res) => {
  try {
    const { id_usuario, fecha_inicio, fecha_fin } = req.body;

    // Validar parámetros
    if (!id_usuario || isNaN(id_usuario)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({ error: 'Fechas inválidas' });
    }

    // 1. Obtener las solicitudes junto con la información del cliente y negocio
    const sqlSolicitudes = `
      SELECT DISTINCT
        s.id_solicitud,
        s.direccion_recogida,
        s.direccion_entrega,
        s.estado AS estado_solicitud,
        s.fecha_creacion AS fecha_solicitud,
        uc.nombre AS nombre_cliente,
        uc.telefono AS telefono_cliente,
        uc.tipo_usuario AS tipo_cliente,
        n.nombre_negocio,
        n.direccion,
        COUNT(s.id_solicitud) OVER() AS total_solicitudes
      FROM solicitudes s
      INNER JOIN usuarios uc ON s.id_cliente = uc.id_usuario
      LEFT JOIN negocios n ON n.id_usuario = s.id_cliente
      WHERE s.id_cliente = ?
        AND DATE(s.fecha_creacion) BETWEEN ? AND ?
      ORDER BY s.fecha_creacion DESC
    `;

    console.log('Executing query with params:', [id_usuario, fecha_inicio, fecha_fin]); // Debug log

    const [solicitudes] = await conexion.query(sqlSolicitudes, [
      id_usuario,
      fecha_inicio,
      fecha_fin
    ]);

    console.log('Query results:', solicitudes); // Debug log

    if (solicitudes.length === 0) {
      return res.status(404).json({ 
        error: 'No se encontraron solicitudes para este usuario en el rango de fechas especificado',
        params: { id_usuario, fecha_inicio, fecha_fin } // Debug info
      });
    }

    // 2. Obtener todas las novedades asociadas a las solicitudes
    const sqlNovedades = `
      SELECT
        n.id_solicitud,
        n.descripcion AS novedad_descripcion,
        n.estado AS novedad_estado,
        n.fecha_reporte,
        n.ubicacionActual
      FROM novedades n
      WHERE n.id_solicitud IN (${solicitudes.map(s => s.id_solicitud).join(',')})
      ORDER BY n.fecha_reporte DESC
    `;

    const [novedades] = await conexion.query(sqlNovedades);

    // 3. Agrupar novedades por solicitud y dar formato a la respuesta
    const solicitudesConNovedades = solicitudes.map(solicitud => ({
      id_solicitud: solicitud.id_solicitud,
      direccion_recogida: solicitud.direccion_recogida,
      direccion_entrega: solicitud.direccion_entrega,
      estado_solicitud: solicitud.estado_solicitud,
      fecha_solicitud: solicitud.fecha_solicitud,
      nombre_cliente: solicitud.nombre_cliente,
      telefono_cliente: solicitud.telefono_cliente,
      tipo_cliente: solicitud.tipo_cliente,
      nombre_negocio: solicitud.nombre_negocio,
      direccion: solicitud.direccion,
      total_solicitudes: solicitud.total_solicitudes,
      novedades: novedades.filter(nov => nov.id_solicitud === solicitud.id_solicitud)
    }));

    // 4. Responder con el reporte generado
    res.status(200).json({
      message: 'Reporte de ventas generado exitosamente',
      data: solicitudesConNovedades,
      total_solicitudes: solicitudesConNovedades.length
    });

  } catch (err) {
    console.error('Error al generar reporte de ventas:', err);
    res.status(500).json({
      error: 'Error al generar reporte de ventas',
      details: err.message
    });
  }
};