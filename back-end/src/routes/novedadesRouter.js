import { Router } from "express";
import { registrarNovedad, listarNovedad, actualizarNovedad, eliminarNovedad } from "../controllers/novedadesController.js";
import { verificar } from "../middleware/LoginMidleware.js";

const RutaNovedad = Router();

RutaNovedad.post("/", /* verificar, */ registrarNovedad);
RutaNovedad.get("/", /* verificar, */ listarNovedad);
RutaNovedad.put("/:id", /* verificar, */ actualizarNovedad);
RutaNovedad.delete("/:id", /* verificar, */ eliminarNovedad);

export default RutaNovedad;