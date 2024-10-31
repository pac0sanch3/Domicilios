import { conexion } from "../databases/conexion.js"

export const registrarSolicitud = async (req, res) =>{

    try{
        const{fk_cliente, direccionRecogida, direccionEntrega, instruccionesAdcc } = req.body


        let sqlDomiciliarios = ` 
            SELECT DISTINCT d.* 
            FROM domiciliarios d 
            INNER JOIN usuarios u ON d.id_usuario = u.id_usuario
            LEFT JOIN novedades n ON d.id_domiciliario = n.id_domiciliario 
            LEFT JOIN reporte_incidencias ri ON d.id_usuario = ri.id_usuario 
            WHERE d.disponibilidad = 'disponible' 
            AND (n.estado IS NULL OR n.estado = 'resuelta') 
            AND (ri.estado IS NULL OR ri.estado = 'resuelto')
            AND u.tipo_usuario = 'domiciliario'
        `
        const [domiciliariosDis] = await conexion.query(sqlDomiciliarios)


        //hacer validacion en caso de que no existan domiciliarios disponibles. 

        if (domiciliariosDis.length >0){
            let pocicionAleatoria = Math.floor(Math.random() * domiciliariosDis.length)

            const domiciliario = domiciliariosDis[pocicionAleatoria]

            const idDomiciliarioSelec= domiciliario.id_domiciliario
    
            
    
            /* Registramos la solicitud */
            let sql = `insert into solicitudes (id_cliente, id_domiciliario, direccion_recogida, direccion_entrega, instruccionesAdc) 
            values(${fk_cliente}, ${idDomiciliarioSelec}, '${direccionRecogida}', '${direccionEntrega}',  '${instruccionesAdcc}')`
            
            const [response] = await conexion.query(sql)


            /* Una vez registrada la solicitud hacemos la consulta de la solicitud registrada para que nos traiga toda la informacion relacionada */

            /* consultamos la informacion de la solicitud */
            let soliInfo = `select * from solicitudes where id_solicitud = ${response.insertId}`
            
            /* tenemos la info de la solicitud */
            const [dataSoli]  = await conexion.query(soliInfo)
            
            /* ahora vamos a encntrar la info del domiciliario */


            let domiciInfo = `
            SELECT 
                d.id_domiciliario,
                d.licencia_vehiculo,
                d.disponibilidad,
                u.nombre,
                u.correo,
                u.telefono
            FROM usuarios u
            INNER JOIN domiciliarios d ON u.id_usuario = d.id_usuario
            WHERE d.id_domiciliario = ${dataSoli[0].id_domiciliario}
            `

            const [domicilInfo] = await conexion.query(domiciInfo)


            /* consultamos ahora lla informacion del cliente */


            let sqlCliente = `
            SELECT 
                u.id_usuario,
                u.nombre,
                u.tipo_usuario,
                u.correo,
                u.telefono,
                u.estado,
                u.fecha_creacion,
                u.fecha_actualizacion,
                n.id_negocio,
                n.nombre_negocio,
                n.imagen_banner,
                n.direccion,
                n.fecha_creacion AS negocio_fecha_creacion,
                n.fecha_actualizacion AS negocio_fecha_actualizacion
            FROM 
                usuarios u
            LEFT JOIN 
                negocios n ON u.id_usuario = n.id_usuario
            WHERE 
                u.id_usuario = ${dataSoli[0].id_cliente}
            `


            const [infoCliente]  = await conexion.query(sqlCliente)
             




            const infoSolicitudCo = {
                domicilInfo,
                dataSoli,
                infoCliente,

            }    
            return res.status(200).json({infoSolicitudCo})
        }
        else{
            return res.status(404).json({"mensaje":"No se encuentran domiciliarios disponibles en este momento, intentar mas tarde"})
        }
    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error})
    }
}

export const actualizarSolicitud = async(req, res)=>{
    try{



        const{fk_cliente, fk_domiciliario, direccionRecogida, direccionEntrega, estado, instruccionesAdcc,  idSolicitud} = req.body

        let sql = `update solicitudes set  id_cliente = ${fk_cliente}, id_domiciliario = ${fk_domiciliario}, direccion_recogida = '${direccionRecogida}', direccion_entrega = '${direccionEntrega}', estado ='${estado}', instruccionesAdc= '${instruccionesAdcc}' where id_solicitud = ${idSolicitud}`

        console.log(sql)
        const [response] = await conexion.query(sql)
    
        return res.status(200).json(response)

    }
    catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error})
    }
}

/* listar todas las solicitudes */

export const listarSolicitudes = async (req, res) =>{

    try{
        let sql = `select * from solicitudes`

        const [response] = await conexion.query(sql)


        console.log(response)

        return res.status(200).json(response)

    }catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error})
    }

}

/* actualizar solo el estado */
export const actEstadoSolicitud = async(req, res)=>{
    try{



        const{estado, idSolicitud} = req.body

        let sql = `update solicitudes set  estado ='${estado}' where id_solicitud = ${idSolicitud}`

        const [response] = await conexion.query(sql)
    
        return res.status(200).json(response)

    }
    catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error})
    }
}



export const reasignarSoli = async(req, res)=>{
    
    try{

        const{idSolicitud, idDomiciliario} = req.body


        let sql = `update solicitudes set  estado ='reprogramado', id_domiciliario=${idDomiciliario} where id_solicitud = ${idSolicitud}`

        const [response] = await conexion.query(sql)

        if (response.affectedRows>0){
            return res.status(200).json({"mensaje":"Se reasigno correctamente el pedido"})
        }else{
            return res.status(404).json({"mensaje":"Error, no se reasigno correctamente el pedido"})
        }
        
    }
    catch(error){
        return res.status(500).json({"mensaje":"Error en el servidor",error})
    }
}



/* consulta que me liste los domicilios de ese un determinado domiciliario*/
export const listSolicitudesDomi = async (req, res)=>{
    try{

        const {idDomiciliario} = req.params

        let sql = `
        SELECT
            s.id_solicitud,
            s.direccion_recogida,
            s.direccion_entrega,
            s.instruccionesAdc,
            u.correo,
            u.telefono,
            u.nombre,
            s.estado,
            u.tipo_usuario
        FROM solicitudes AS s
        INNER JOIN usuarios AS u ON s.id_cliente = u.id_usuario
        WHERE s.id_domiciliario = ${idDomiciliario}
        AND s.estado = 'en_curso'
        `

        const [response] = await conexion.query(sql)
        console.log(response)

        return res.status(200).json({response})

    }catch(error){
        return res.status(500).json({"mensaje":"error en el servidor", error})
    }
}

/* listrar las solicitudes de un cliente o empresa */
export const listSolicitudesCliente = async(req, res)=>{
    try{

        const {idCliente} = req.params

        let sql = `
        SELECT
            s.id_solicitud,
            s.direccion_recogida,
            s.direccion_entrega,
            s.instruccionesAdc,
            s.fecha_creacion,
            u.correo,
            u.telefono,
            u.nombre,
            s.estado,
            u.tipo_usuario,
            d.licencia_vehiculo
        FROM solicitudes AS s
        INNER JOIN domiciliarios as d ON s.id_domiciliario = d.id_domiciliario
        INNER JOIN usuarios as u ON d.id_usuario = u.id_usuario
        WHERE s.id_cliente = ${idCliente}
        `

        const [response] = await conexion.query(sql)

        return res.status(200).json({response})

    }catch(error){
        return res.status(500).json({"mensaje":"error en el servidor", error})
    }
}

/* consultar a que domiciliario le pertenece un id */
export const buscarDomi = async(req, res)=>{
    try{

        const {idUser} = req.params

        let sql  = 
        `SELECT
        d.id_domiciliario
        FROM usuarios AS u
        INNER JOIN domiciliarios AS d ON u.id_usuario = d.id_usuario
        WHERE u.id_usuario = ${idUser};
        `

        const [response] = await conexion.query(sql)

        return res.status(200).json({response})
        
    }catch(error){
        return res.status(500).json({"mensaje":"error en el servidor", error})
    }
}