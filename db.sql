-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2022 a las 21:05:41
-- Versión del servidor: 10.5.16-MariaDB
-- Versión de PHP: 8.2.0RC6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_prueba`
--
CREATE DATABASE IF NOT EXISTS `db_prueba` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_prueba`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients`
--

CREATE TABLE `tb_clients` (
  `ni_client` int(10) NOT NULL,
  `name_client` varchar(30) NOT NULL,
  `surname_client` varchar(30) NOT NULL,
  `email_client` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_clients`
--

INSERT INTO `tb_clients` (`ni_client`, `name_client`, `surname_client`, `email_client`) VALUES
(1206920579, 'Carlos', 'Colcha', 'carlosarielcb3@gmail.com'),
(1207894563, 'Luis Juan', 'Gonzales', 'juan@test.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_orders`
--

CREATE TABLE `tb_orders` (
  `id_order` int(11) NOT NULL,
  `code_order` int(8) DEFAULT NULL,
  `date_order` longtext DEFAULT NULL,
  `ni_client` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_orders`
--

INSERT INTO `tb_orders` (`id_order`, `code_order`, `date_order`, `ni_client`) VALUES
(6, 1234567892, '23/11/2022, 09:41:16', 1206920579),
(7, 12312312, '23/11/2022, 11:57:53', 1207894563);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_clients`
--
ALTER TABLE `tb_clients`
  ADD PRIMARY KEY (`ni_client`);

--
-- Indices de la tabla `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD PRIMARY KEY (`id_order`,`ni_client`),
  ADD KEY `fk_tb_orders_1_idx` (`ni_client`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_orders`
--
ALTER TABLE `tb_orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD CONSTRAINT `fk_tb_orders_1` FOREIGN KEY (`ni_client`) REFERENCES `tb_clients` (`ni_client`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
