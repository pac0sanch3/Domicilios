import { Router } from "express"

import {registrarSolicitud, actualizarSolicitud, actEstadoSolicitud, listarSolicitudes} from '../controllers/SolicitudController.js'


const RutaSolicitud = Router()

RutaSolicitud.post('/registrar',registrarSolicitud )
RutaSolicitud.put('/actualizar',actualizarSolicitud )
RutaSolicitud.put('/actualizarEstado', actEstadoSolicitud)
RutaSolicitud.get('/listar', listarSolicitudes)

export default RutaSolicitud