import { Router } from "express";
import { registrarDomiciliario, listarDomiciliarios, actualizarDomiciliario, eliminarDomiciliario } from "../controllers/domiciliariosController.js";
import { verificar } from "../middleware/LoginMidleware.js";

const RutaDomiciliario = Router();

RutaDomiciliario.post("/", verificar, registrarDomiciliario);
RutaDomiciliario.get("/", verificar, listarDomiciliarios);
RutaDomiciliario.put("/:id", verificar, actualizarDomiciliario);
RutaDomiciliario.delete("/:id", verificar, eliminarDomiciliario);

export default RutaDomiciliario;