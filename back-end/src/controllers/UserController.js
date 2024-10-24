import { conexion } from "../databases/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Función auxiliar para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email) => emailRegex.test(email);

// Función auxiliar para validar teléfono
const phoneRegex = /^\d{10}$/;
const validatePhone = (phone) => phoneRegex.test(phone);

// Registro de usuarios
export const registrarUsuario = async (req, res) => {
    try { 
        const { nombre, tipo_usuario, correo, telefono, contrasena } = req.body;

        // Validaciones básicas
        if (!nombre || !tipo_usuario || !correo || !telefono || !contrasena) {
            return res.status(400).json({ 
                mensaje: "Todos los campos son obligatorios" 
            });
        }

        // Validar formato de email
        if (!validateEmail(correo)) {
            return res.status(400).json({ 
                mensaje: "Formato de correo electrónico inválido" 
            });
        }

        // Validar formato de teléfono
        if (!validatePhone(telefono)) {
            return res.status(400).json({ 
                mensaje: "El teléfono debe tener 10 dígitos" 
            });
        }

        // Validar tipo de usuario
        const tiposValidos = ['administrador', 'negocio', 'particular', 'domiciliario'];
        if (!tiposValidos.includes(tipo_usuario)) {
            return res.status(400).json({ 
                mensaje: "Tipo de usuario inválido" 
            });
        }

        // Verificar si el correo ya existe
        const [existeCorreo] = await conexion.query(
            "SELECT correo FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (existeCorreo.length > 0) {
            return res.status(400).json({ 
                mensaje: "El correo ya está registrado" 
            });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(contrasena, salt);

        // Insertar usuario
        const [resultado] = await conexion.query(
            `INSERT INTO usuarios (nombre, tipo_usuario, correo, telefono, contrasena, estado) 
             VALUES (?, ?, ?, ?, ?, 'activo')`,
            [nombre, tipo_usuario, correo, telefono, hashPassword]
        );

        return res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            id: resultado.insertId
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });
    }
};

// Listar todos los usuarios
export const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexion.query(
            "SELECT id_usuario, nombre, tipo_usuario, correo, telefono, estado, fecha_creacion, fecha_actualizacion FROM usuarios"
        );

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al listar usuarios",
            error: error.message
        });
    }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [usuario] = await conexion.query(
            `SELECT id_usuario, nombre, tipo_usuario, correo, telefono, estado, 
             fecha_creacion, fecha_actualizacion 
             FROM usuarios WHERE id_usuario = ?`,
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        return res.status(200).json(usuario[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo_usuario, correo, telefono, estado } = req.body;

        // Verificar si el usuario existe
        const [usuarioExiste] = await conexion.query(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [id]
        );

        if (usuarioExiste.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        // Validaciones básicas
        if (correo && !validateEmail(correo)) {
            return res.status(400).json({
                mensaje: "Formato de correo electrónico inválido"
            });
        }

        if (telefono && !validatePhone(telefono)) {
            return res.status(400).json({
                mensaje: "El teléfono debe tener 10 dígitos"
            });
        }

        if (tipo_usuario) {
            const tiposValidos = ['administrador', 'negocio', 'particular', 'domiciliario'];
            if (!tiposValidos.includes(tipo_usuario)) {
                return res.status(400).json({
                    mensaje: "Tipo de usuario inválido"
                });
            }
        }

        if (estado && !['activo', 'inactivo'].includes(estado)) {
            return res.status(400).json({
                mensaje: "Estado inválido"
            });
        }

        // Verificar si el nuevo correo ya existe
        if (correo && correo !== usuarioExiste[0].correo) {
            const [existeCorreo] = await conexion.query(
                "SELECT correo FROM usuarios WHERE correo = ? AND id_usuario != ?",
                [correo, id]
            );

            if (existeCorreo.length > 0) {
                return res.status(400).json({
                    mensaje: "El correo ya está registrado"
                });
            }
        }

        // Actualizar usuario
        const [resultado] = await conexion.query(
            `UPDATE usuarios 
             SET nombre = COALESCE(?, nombre),
                 tipo_usuario = COALESCE(?, tipo_usuario),
                 correo = COALESCE(?, correo),
                 telefono = COALESCE(?, telefono),
                 estado = COALESCE(?, estado),
                 fecha_actualizacion = CURRENT_TIMESTAMP
             WHERE id_usuario = ?`,
            [nombre, tipo_usuario, correo, telefono, estado, id]
        );

        return res.status(200).json({
            mensaje: "Usuario actualizado exitosamente"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al actualizar usuario",
            error: error.message
        });
    }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const [usuarioExiste] = await conexion.query(
            "SELECT id_usuario FROM usuarios WHERE id_usuario = ?",
            [id]
        );

        if (usuarioExiste.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        // Eliminar usuario
        await conexion.query(
            "DELETE FROM usuarios WHERE id_usuario = ?",
            [id]
        );

        return res.status(200).json({
            mensaje: "Usuario eliminado exitosamente"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
        }

        // Buscar usuario
        const [usuarios] = await conexion.query(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        const usuario = usuarios[0];

        // Verificar estado
        if (usuario.estado !== 'activo') {
            return res.status(401).json({
                mensaje: "Usuario inactivo"
            });
        }

        // Verificar contraseña
        const contrasenasCoinciden = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenasCoinciden) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        if (!process.env.AUTH_SECRET) {
            throw new Error("AUTH_SECRET no está configurada");
        }

        // Generar token
        const token = jwt.sign(
            {
                user: {
                    id: usuario.id_usuario,
                    tipo_usuario: usuario.tipo_usuario
                }
            },
            process.env.AUTH_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            mensaje: "Login exitoso",
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                tipo_usuario: usuario.tipo_usuario,
                correo: usuario.correo
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error en el login",
            error: error.message
        });
    }
};


// Recuperar contraseña
/* export const recuperarContrasena = async (req, res) => {
    try {
        const { correo } = req.body;

        if (!correo) {
            return res.status(400).json({
                mensaje: "El correo es obligatorio"
            });
        }

        // Buscar usuario por correo
        const [usuario] = await conexion.query(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontró usuario con este correo"
            });
        }

        // Generar contraseña temporal
        const contrasenaTemporal = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(contrasenaTemporal, salt);

        // Actualizar contraseña en la base de datos
        await conexion.query(
            "UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?",
            [hashPassword, usuario[0].id_usuario]
        );

        // Enviar correo con la contraseña temporal
        await transporter.sendMail({
            from: '"Sistema" <sistema@example.com>',
            to: correo,
            subject: "Recuperación de contraseña",
            html: `
                <h1>Recuperación de contraseña</h1>
                <p>Hola ${usuario[0].nombre},</p>
                <p>Tu nueva contraseña temporal es: <strong>${contrasenaTemporal}</strong></p>
                <p>Por favor, cambia tu contraseña después de iniciar sesión.</p>
            `
        });

        return res.status(200).json({
            mensaje: "Se ha enviado una nueva contraseña a tu correo"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: "Error al recuperar contraseña",
            error: error.message
        });
    }
}; */

