-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2020 a las 16:54:00
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--
CREATE DATABASE IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `delilah`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `date` datetime NOT NULL,
  `description` text DEFAULT NULL,
  `total_cost` int(8) NOT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `date`, `description`, `total_cost`, `payment_method`, `status`) VALUES
(52, 2, '2020-10-24 03:03:55', ' 3 - Hamburguesa 2 - Coca Cola', 68000, NULL, 1),
(53, 2, '2020-10-24 03:04:58', ' 3 - Hamburguesa 2 - Coca Cola', 68000, 'Efectivo', 1),
(54, 2, '2020-10-28 01:45:15', ' 3 - Hamburguesa 2 - Coca Cola', 69000, NULL, 1),
(55, 2, '2020-10-28 01:47:01', ' 4 - Hamburguesa 4 - Coca Cola', 98000, '2 Credit Card', 3),
(58, 2, '2020-10-31 03:06:20', ' 4 - Hamburguesa 4 - Coca Cola', 98000, 'Efectivo', 1),
(59, 1, '2020-10-31 03:09:26', ' 4 - Hamburguesa 4 - Coca Cola', 98000, 'Efectivo', 1),
(60, 1, '2020-10-31 13:03:26', ' 4 - Hamburguesa 4 - Coca Cola', 98000, 'Efectivo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

CREATE TABLE `order_details` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_amount` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `product_amount`) VALUES
(23, 52, 1, 3),
(24, 52, 2, 2),
(25, 53, 1, 3),
(26, 53, 2, 2),
(27, 54, 1, 3),
(28, 54, 2, 2),
(29, 55, 1, 4),
(30, 55, 2, 4),
(35, 58, 1, 4),
(36, 58, 2, 4),
(37, 59, 1, 4),
(38, 59, 2, 4),
(39, 60, 1, 4),
(40, 60, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_states`
--

CREATE TABLE `order_states` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `status_name` varchar(100) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `order_states`
--

INSERT INTO `order_states` (`id`, `order_id`, `status_name`, `date`) VALUES
(1, 45, '', '0000-00-00 00:00:00'),
(2, 52, 'Creada', '2020-10-24 03:03:55'),
(3, 53, 'Creada', '2020-10-24 03:04:58'),
(4, 54, 'Confirmada', '2020-10-28 01:45:15'),
(5, 55, 'Confirmada', '2020-10-28 01:47:01'),
(6, 55, 'En preparación', '2020-10-28 01:57:40'),
(7, 55, 'En Camino', '2020-10-28 01:57:55'),
(10, 55, 'En Camino', '2020-10-31 02:42:34'),
(11, 58, 'Confirmada', '2020-10-31 03:06:20'),
(12, 59, 'Confirmada', '2020-10-31 03:09:26'),
(13, 60, 'Confirmada', '2020-10-31 13:03:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(8) NOT NULL,
  `image` text DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `is_available`) VALUES
(1, 'Hamburguesa', 'Pan con tomate lechuga y carne', 20000, ' ', 1),
(2, 'Coca Cola', 'Coca Cola sabor original', 4500, ' ', 1),
(6, 'Arroz con leche', 'Delicioso Arroz blanco', 5000, ' ', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` int(20) NOT NULL,
  `shipping_address` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `password`, `name`, `email`, `phone`, `shipping_address`, `is_admin`, `is_active`) VALUES
(1, '543345345', 'Gustavo Ramirez 22', 'gustavo2@gmail.com', 2147483647, 'Kra 20', 0, 1),
(2, '123', 'Jenny Cardona Correa', 'jenny@gmail.com', 2147483647, 'Kra 80 32d', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_favorites`
--

CREATE TABLE `user_favorites` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `order_states`
--
ALTER TABLE `order_states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `order_states`
--
ALTER TABLE `order_states`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
