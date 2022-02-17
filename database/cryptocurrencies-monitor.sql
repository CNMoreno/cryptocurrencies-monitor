-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2022 a las 02:57:55
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cryptocurrencies-monitor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cryptos`
--

CREATE TABLE `cryptos` (
  `id` bigint(20) NOT NULL,
  `id_crypto` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `preferred_currency` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `user_name`, `password`, `preferred_currency`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 'Cristian', 'Moreno', 'cnmoreno', '$2b$10$VbQlAmZQ5jmEaCLSNA6eZuYvwJ7Re1HVTORchITUY8aq600RaQBD2', 'usd', 1, '2022-02-14 04:11:26', '2022-02-14 04:11:26'),
(5, 'Cristian', 'Moreno', 'cnmorenao', '$2b$10$o8rdnz60/ZGZUbZby/8EUuq8S9NFPpiLvKS9XUj2Vid/dS/Oc5o22', 'usd', 1, '2022-02-14 04:13:50', '2022-02-14 04:13:50'),
(6, 'nameActualizado', 'Moreno', 'cnmoreno1', '$2b$10$3O6HUzUzu5cDCt22cOqldet3ro4BAGPlelouxGUivrIi0xNTf6t6m', 'usd', 1, '2022-02-17 00:05:44', '2022-02-17 01:20:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cryptos`
--
ALTER TABLE `cryptos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name_unique` (`user_name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cryptos`
--
ALTER TABLE `cryptos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cryptos`
--
ALTER TABLE `cryptos`
  ADD CONSTRAINT `cryptos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
