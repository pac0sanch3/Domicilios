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
    
    
            return res.status(200).json({response})
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

        console.log(sql)
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