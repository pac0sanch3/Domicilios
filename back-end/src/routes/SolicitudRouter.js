import { Router } from "express"

import {registrarSolicitud, actualizarSolicitud, actEstadoSolicitud, listarSolicitudes, reasignarSoli} from '../controllers/SolicitudController.js'


const RutaSolicitud = Router()

RutaSolicitud.post('/registrar',registrarSolicitud )
RutaSolicitud.put('/actualizar',actualizarSolicitud )
RutaSolicitud.put('/actualizarEstado', actEstadoSolicitud)
RutaSolicitud.get('/listar', listarSolicitudes)

RutaSolicitud.put('/reasignarSoli', reasignarSoli)

export default RutaSolicitud