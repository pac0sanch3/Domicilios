import { Router } from "express";
import { 
    registrarDomiciliario, 
    listarDomiciliarios, 
    actualizarDomiciliario, 
    eliminarDomiciliario, 
    actualizarDisponibilidad, 
    listarDomiciliariosPorUsuario,
    /* Reportes */ 
    reportesDomiciliario,
    reportesVentas

} from "../controllers/domiciliariosController.js";
import { verificar } from "../middleware/LoginMidleware.js";

const RutaDomiciliario = Router();

RutaDomiciliario.post("/",  registrarDomiciliario);
RutaDomiciliario.get("/",  listarDomiciliarios);
RutaDomiciliario.put("/:id",  actualizarDomiciliario);
RutaDomiciliario.delete("/:id",  eliminarDomiciliario);
RutaDomiciliario.put("/disponibilidad/:id",  actualizarDisponibilidad);
RutaDomiciliario.get('/consultar/:id_usuario', listarDomiciliariosPorUsuario);

/* reportes */
RutaDomiciliario.post('/reportes_domiciliario', reportesDomiciliario);
RutaDomiciliario.post('/reportes_ventas', reportesVentas);

export default RutaDomiciliario;