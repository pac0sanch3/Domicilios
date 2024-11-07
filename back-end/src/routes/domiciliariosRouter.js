import { Router } from "express";
import { registrarDomiciliario, listarDomiciliarios, actualizarDomiciliario, eliminarDomiciliario, actualizarDisponibilidad, listarDomiciliariosPorUsuario } from "../controllers/domiciliariosController.js";
import { verificar } from "../middleware/LoginMidleware.js";

const RutaDomiciliario = Router();

RutaDomiciliario.post("/",  registrarDomiciliario);
RutaDomiciliario.get("/",  listarDomiciliarios);
RutaDomiciliario.put("/:id",  actualizarDomiciliario);
RutaDomiciliario.delete("/:id",  eliminarDomiciliario);
RutaDomiciliario.put("/disponibilidad/:id",  actualizarDisponibilidad);
RutaDomiciliario.get('/consultar/:id_usuario', listarDomiciliariosPorUsuario)

export default RutaDomiciliario;