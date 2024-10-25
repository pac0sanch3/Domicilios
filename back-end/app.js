import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RutaUsuario from "./src/routes/UserRoutes.js";
import RutaInsidencias from "./src/routes/InsidenciasController.js";

const servidor = Express()
const port = 3000

servidor.use(cors())
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({ extended: true }))
servidor.use(Express.static("./public"))

servidor.use("/usuario", RutaUsuario);
servidor.use("/insidencias",RutaInsidencias);

servidor.get("/", (req, res) => {
    res.status(200).json({ mensaje: "Bienvenidos a RunWay" })
})

servidor.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})