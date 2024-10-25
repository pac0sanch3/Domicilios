import { conexion } from "../databases/conexion.js"

export const registrarSolicitud = async (req, res) =>{

    try{
        const{fk_cliente, direccionRecogida, direccionEntrega, instruccionesAdcc } = req.body
    


        let sqlDomiciliarios = ` 
            SELECT DISTINCT d.* FROM runwaydomicilios.domiciliarios d 
            LEFT JOIN runwaydomicilios.novedades n ON d.id_domiciliario = n.id_domiciliario 
            LEFT JOIN runwaydomicilios.reporte_incidencias ri ON d.id_usuario = ri.id_usuario 
            WHERE d.disponibilidad = 'disponible' 
            AND (n.estado IS NULL OR n.estado = 'resuelta') 
            AND (ri.estado IS NULL OR ri.estado = 'resuelto')
        `
        const [domiciliariosDis] = await conexion.query(sqlDomiciliarios)


        //hacer validacion en caso de que no existan domiciliarios disponibles. 
        
        let pocicionAleatoria = Math.floor(Math.random() * domiciliariosDis.length)

        const domiciliario = domiciliariosDis[pocicionAleatoria]


        const idDomiciliarioSelec= domiciliario.id_domiciliario


        let sql = `insert into solicitudes (id_cliente, id_domiciliario, direccion_recogida, direccion_entrega, instruccionesAdc) 
        values(${fk_cliente}, ${idDomiciliarioSelec}, '${direccionRecogida}', '${direccionEntrega}',  '${instruccionesAdcc}')`
        
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
