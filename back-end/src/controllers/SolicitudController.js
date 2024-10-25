import { conexion } from "../databases/conexion.js"

export const registrarSolicitud = async (req, res) =>{

    try{
        const{fk_cliente, fk_domiciliario, direccionRecogida, direccionEntrega, instruccionesAdcc } = req.body
    
        let sql = `insert into solicitudes (id_cliente, id_domiciliario, direccion_recogida, direccion_entrega, instruccionesAdc) 
        values(${fk_cliente}, ${fk_domiciliario}, '${direccionRecogida}', '${direccionEntrega}',  '${instruccionesAdcc}')`
        
        const [response] = await conexion.query(sql)

        return res.status(200).json({response})


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
