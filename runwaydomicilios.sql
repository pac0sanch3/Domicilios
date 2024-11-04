-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-11-2024 a las 01:14:31
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `runwaydomicilios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domiciliarios`
--

CREATE TABLE `domiciliarios` (
  `id_domiciliario` int NOT NULL,
  `id_usuario` int NOT NULL,
  `licencia_vehiculo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `disponibilidad` enum('disponible','no_disponible','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'disponible',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `domiciliarios`
--

INSERT INTO `domiciliarios` (`id_domiciliario`, `id_usuario`, `licencia_vehiculo`, `disponibilidad`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(4, 6, 'ewqewqe', 'disponible', '2024-10-30 19:13:56', '2024-10-30 19:13:56'),
(5, 2, 'rtetet', 'disponible', '2024-10-31 12:44:24', '2024-10-31 12:44:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `negocios`
--

CREATE TABLE `negocios` (
  `id_negocio` int NOT NULL,
  `id_usuario` int NOT NULL,
  `nombre_negocio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_banner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id_novedad` int NOT NULL,
  `id_domiciliario` int NOT NULL,
  `id_solicitud` int DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('pendiente','resuelta') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pendiente',
  `fecha_reporte` datetime NOT NULL,
  `ubicacionActual` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id_novedad`, `id_domiciliario`, `id_solicitud`, `descripcion`, `estado`, `fecha_reporte`, `ubicacionActual`) VALUES
(3, 4, 37, 'novedad 1', 'pendiente', '2024-10-30 14:47:41', 'adadsad'),
(4, 4, 37, 'novedad 2 ', 'pendiente', '2024-10-30 14:49:03', 'asdaasdd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_actividades`
--

CREATE TABLE `registro_actividades` (
  `id_registro` int NOT NULL,
  `id_usuario` int NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_incidencias`
--

CREATE TABLE `reporte_incidencias` (
  `id_reporte` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_solicitud` int NOT NULL,
  `tipo_incidencia` enum('entrega_fallida','producto_danado','accidente','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('pendiente','resuelto') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pendiente',
  `fecha_reporte` datetime NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id_solicitud` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_domiciliario` int DEFAULT NULL,
  `direccion_recogida` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion_entrega` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('pendiente','asignado','en_curso','completado','reprogramado','cancelado') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'en_curso',
  `fecha_hora` datetime DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `instruccionesAdc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id_solicitud`, `id_cliente`, `id_domiciliario`, `direccion_recogida`, `direccion_entrega`, `estado`, `fecha_hora`, `fecha_creacion`, `fecha_actualizacion`, `instruccionesAdc`) VALUES
(37, 7, 4, 'qweq', 'eqeq', 'reprogramado', NULL, '2024-10-30 19:14:07', '2024-11-01 22:44:37', 'eqeq'),
(38, 3, 5, 'barrio1', 'barrio 2', 'completado', NULL, '2024-10-31 12:44:50', '2024-10-31 15:02:47', 'sdssd'),
(39, 3, 5, 'wqew', 'qwe', 'completado', NULL, '2024-10-31 12:46:05', '2024-10-31 14:28:24', 'weq'),
(40, 3, 5, 'fsdfs', 'dsfds', 'completado', NULL, '2024-10-31 12:46:48', '2024-10-31 14:28:29', 'fdfdsf'),
(41, 3, 5, 'er', 're', 'completado', NULL, '2024-10-31 12:47:04', '2024-10-31 15:02:52', 'er'),
(42, 3, 5, 'rewr', 'erew', 'completado', NULL, '2024-10-31 12:47:27', '2024-10-31 15:02:57', 'erw'),
(43, 3, 5, '34324', '32432', 'completado', NULL, '2024-10-31 14:59:26', '2024-10-31 15:03:01', '34324'),
(44, 3, 5, 'pedidoone', 'ewwe', 'completado', NULL, '2024-10-31 15:05:47', '2024-10-31 15:12:03', 'ewew'),
(45, 3, 5, 'erw', 'erw', 'completado', NULL, '2024-10-31 15:08:01', '2024-11-01 22:49:26', 'wereew'),
(46, 3, 5, 'wqeqw', 'weqw', 'completado', NULL, '2024-10-31 15:11:46', '2024-10-31 15:12:10', 'we'),
(47, 3, 5, 'wqewq', 'weqwe', 'en_curso', NULL, '2024-10-31 15:12:19', '2024-10-31 15:12:19', 'weqwe'),
(48, 8, 5, 'Diagonal 3 sur # 7-48 111 ', 'Avinida 24', 'en_curso', NULL, '2024-10-31 17:01:29', '2024-10-31 17:01:29', 'contenido delicado\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_usuario` enum('administrador','negocio','particular','domiciliario') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `tipo_usuario`, `correo`, `telefono`, `contrasena`, `estado`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'apolo deidad', 'particular', 'apolo@deidad.com', '3124864559', '$2a$10$rt2ewg4i/d1VWKNZzDRMKuCsP9lcyrdDwo2i3mDgEkxImCCvG.TU6', 'activo', '2024-10-25 06:57:17', '2024-10-30 05:53:30'),
(2, 'gfdfgdfgf', 'domiciliario', 'rtrtertre@gmail.com', '3204481810', '123231', 'activo', '2024-10-25 13:50:08', '2024-10-25 13:50:08'),
(3, 'Juan Camilo Alvarez Molano ', 'negocio', 'camilo.alvarez3008@gmail.com', '3204481818', '$2a$10$LzQZBESCfLmtAeGQagraI.gTemG0XRlnTQuDxJvVx/OjwrfH7iRKe', 'activo', '2024-10-30 00:01:23', '2024-10-31 12:20:24'),
(4, 'domici2', 'domiciliario', 'domici2@gmail.com', '3030303030', 'cami3008', 'activo', '2024-10-29 23:53:18', '2024-10-29 23:53:18'),
(5, 'admin', 'administrador', 'admin@gmail.com', '3204481818', '$2a$10$N4aAevlzTPPWcb9E1s74.O1IDYzpnRKb8D.YVLBKMtSPfpJJKxntm', 'activo', '2024-10-30 19:09:49', '2024-10-30 19:10:48'),
(6, 'domiciliario 1', 'domiciliario', 'admin1@gmail.com', '3204481818', '$2a$10$oOdJVv31TkjyGGrFoGfDMud51QG.nehb4ZoJ/gPMNwljSCsB15QyO', 'activo', '2024-10-30 19:12:01', '2024-10-30 19:12:01'),
(7, 'cliente', 'particular', 'admin2@gmail.com', '3204481818', '$2a$10$dVkQqwlcQhpyV0sbpDXRa.Lgz/FmqsbdvJK79ghlKjaTZgonTHbbG', 'activo', '2024-10-30 19:12:41', '2024-10-30 19:12:41'),
(8, 'ADMINCAMILO ', 'administrador', 'camilo.alvarez30081@gmail.com', '3204481818', '$2a$10$oMeQTEDggk1hM4GhVEjhvOyR06/hyU4mbKjlY26BeEjva7AYspxDO', 'activo', '2024-10-31 17:00:36', '2024-10-31 17:02:17'),
(9, 'pacosanche', 'domiciliario', 'paco@paco.com', '3214523331', '$2a$10$R1Udy1Jf1Jlla7PlfdU70uA6RGwvonc5Wp0GB.kBXd3Ot6A.CA.3W', 'activo', '2024-11-01 22:48:57', '2024-11-01 22:49:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `domiciliarios`
--
ALTER TABLE `domiciliarios`
  ADD PRIMARY KEY (`id_domiciliario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `negocios`
--
ALTER TABLE `negocios`
  ADD PRIMARY KEY (`id_negocio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id_novedad`),
  ADD KEY `id_domiciliario` (`id_domiciliario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `registro_actividades`
--
ALTER TABLE `registro_actividades`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reporte_incidencias`
--
ALTER TABLE `reporte_incidencias`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_solicitud` (`id_solicitud`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_domiciliario` (`id_domiciliario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `domiciliarios`
--
ALTER TABLE `domiciliarios`
  MODIFY `id_domiciliario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `negocios`
--
ALTER TABLE `negocios`
  MODIFY `id_negocio` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id_novedad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `registro_actividades`
--
ALTER TABLE `registro_actividades`
  MODIFY `id_registro` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte_incidencias`
--
ALTER TABLE `reporte_incidencias`
  MODIFY `id_reporte` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitud` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `domiciliarios`
--
ALTER TABLE `domiciliarios`
  ADD CONSTRAINT `domiciliarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `negocios`
--
ALTER TABLE `negocios`
  ADD CONSTRAINT `negocios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `novedades_ibfk_1` FOREIGN KEY (`id_domiciliario`) REFERENCES `domiciliarios` (`id_domiciliario`),
  ADD CONSTRAINT `novedades_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`);

--
-- Filtros para la tabla `registro_actividades`
--
ALTER TABLE `registro_actividades`
  ADD CONSTRAINT `registro_actividades_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reporte_incidencias`
--
ALTER TABLE `reporte_incidencias`
  ADD CONSTRAINT `reporte_incidencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reporte_incidencias_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`id_domiciliario`) REFERENCES `domiciliarios` (`id_domiciliario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
