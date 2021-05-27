-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2021 a las 18:35:22
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `productos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `brand` varchar(50) NOT NULL,
  `img` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`brand`, `img`) VALUES
('levi\'s', 'view/img/brand_1.jpeg'),
('the north face', 'view/img/brand_2.png'),
('lacoste', 'view/img/brand_3.png'),
('patagonia', 'view/img/brand_4.jpeg'),
('puma', 'view/img/brand_5.png'),
('converse', 'view/img/brand_6.jpeg'),
('new balance', 'view/img/brand_7.png'),
('tommy hilfiger', 'view/img/brand_8.jpeg'),
('nike', 'view/img/brand_9.png'),
('vans', 'view/img/brand_10.png'),
('adidas', 'view/img/brand_11.png'),
('carhartt', 'view/img/brand_12.png'),
('new era', 'view/img/brand_13.png'),
('ellesse', 'view/img/brand_14.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `user` varchar(20) NOT NULL,
  `codigo_producto` varchar(20) NOT NULL,
  `qty` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoria` varchar(200) NOT NULL,
  `link` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`categoria`, `link`) VALUES
('ropa', 'https://content.asos-media.com/-/media/homepages/mw/2021/02/15/mw_denim_moment_870x1110.jpg'),
('calzado', 'https://content.asos-media.com/-/media/homepages/mw/2021/02/15/ww_mw_calf_boots_moment_870x1110.jpg'),
('accesorios', 'https://content.asos-media.com/-/media/homepages/mw/2021/02/15/mw_dark_future_moment_870x1110.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `list` varchar(200) NOT NULL,
  `categoria` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`list`, `categoria`) VALUES
('https://cdn.shopify.com/s/files/1/0094/2252/files/4_809fdb57-9573-43e0-8e81-675789a39be4.jpg?v=1544466033', 'Calzado'),
('https://cdn.shopify.com/s/files/1/0094/2252/files/6_dd23bd1c-c865-48a5-b485-29c79b3ded72.jpg?v=1544466056', 'Accesorio'),
('https://cdn.shopify.com/s/files/1/0094/2252/files/3_04a0c746-5805-42b6-bab1-fd6adb4a1979.jpg?v=1544466024', 'Ropa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `user` varchar(50) NOT NULL,
  `codigo_producto` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`user`, `codigo_producto`) VALUES
('jubelltols', 'FM0624'),
('jubelltols', 'B22716-1'),
('jubelltols', '10480106'),
('jubelltols', 'EQYZT05482'),
('jubelltols', 'VN0A45DPBLK'),
('jubelltols', 'EE6147');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapa`
--

CREATE TABLE `mapa` (
  `nombre` varchar(200) NOT NULL,
  `longitud` varchar(200) NOT NULL,
  `latitud` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mapa`
--

INSERT INTO `mapa` (`nombre`, `longitud`, `latitud`) VALUES
('Bondi Skateshop', '-33.890542', '151.274856'),
('Coogee', '-33.923036', '151.259052'),
('Cronulla Shop', '-33.950198', '151.259302'),
('Manly', '-34.028249', '151.157507'),
('Maroubra Surfshop', '-33.800101', '151.287478');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `cod_ped` varchar(20) NOT NULL,
  `user` varchar(20) NOT NULL,
  `cod_prod` varchar(50) NOT NULL,
  `talla` int(20) NOT NULL,
  `cantidad` varchar(10) NOT NULL,
  `precio` varchar(10) NOT NULL,
  `total_precio` varchar(10) NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`cod_ped`, `user`, `cod_prod`, `talla`, `cantidad`, `precio`, `total_precio`, `fecha`) VALUES
('jubelltols', 'jubelltols', 'B22716-1', 46, '1', '54', '54', '20210524'),
('juanmibt', 'juanmibt', 'EE6147', 39, '3', '55', '165', '20210526'),
('jubelltols', 'jubelltols', 'B22716-1', 46, '3', '54', '162', '20210526');

--
-- Disparadores `pedidos`
--
DELIMITER $$
CREATE TRIGGER `delete_cart_AI` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN 
DELETE FROM `cart` WHERE user = NEW.user AND codigo_producto = NEW.cod_prod;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigo_producto` varchar(20) NOT NULL,
  `marca` varchar(200) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `precio` float NOT NULL,
  `talla` float NOT NULL,
  `color` varchar(20) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `images` varchar(200) NOT NULL,
  `categoria` varchar(250) NOT NULL,
  `sexo` varchar(200) NOT NULL,
  `likes` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`codigo_producto`, `marca`, `nombre`, `precio`, `talla`, `color`, `descripcion`, `images`, `categoria`, `sexo`, `likes`) VALUES
('B22716-1', 'adidas', 'ADIDAS CAMPUS ADV', 54, 46, 'NEGRO', 'zapatillas Adidas Campus adv negro', 'view/img/zapatillas-adidas-campus-adv-negro-.png', 'Calzado', 'Hombre', '84'),
('EE6147', 'adidas', 'ADIDAS CAMPUS ADV NEGRO', 55, 39, 'negro', 'zapatillas Adidas Campus adv negro', 'view/img/zapatillas-adidas-campus-adv-negro.png', 'Calzado', 'Niño', '87'),
('FM0624', 'adidas', 'ADIDAS SOLID CREW SOCK AZUL', 12, 0, 'Blanco', 'calcetines Adidas Solid crew sock azul', 'view/img/calcetines-adidas-solid-crew-sock-azul.jpg', 'Accesorio', 'Hombre', '32'),
('10480106', 'BURTON', 'BURTON CHLOE BNIE BURDEOS', 29, 0, 'Burdeos', 'gorros Burton Chloe bnie burdeos', 'view/img/gorros-burton-chloe-bnie-burdeos.jpg', 'Accesorio', 'Mujer', '23'),
('EDYZT04053', 'DC', 'DC TRESTNA SS BLANCO', 17, 0, 'Blanco', 'DC TRESTNA SS BLANCO', 'view/img/camisetas-de-manga-corta-dc-trestna-ss-blanco.jpg', 'Ropa', 'Hombre', '0'),
('GGCSW336', 'GRIMEY', 'GRIMEY URMAH GIRL CROP CREWNEC', 49, 0, 'Negro', 'sudaderas sin capucha Grimey Urmah girl crop crewneck negro', 'view/img/sudaderas-sin-capucha-grimey-urmah-girl-crop-crewneck-negro.jpg', 'Ropa', 'Mujer', '10'),
('AQ7460-201', 'nike', 'NIKE ZOOM STEFAN JANOSKI MID C', 57, 44, 'marron', 'zapatillas Nike Zoom stefan janoski mid crafted camel', 'view/img/zapatillas-nike-zoom-stefan-janoski-mid-crafted-camel.png', 'Calzado', 'Hombre', '1'),
('EQYZT05482', 'QUIKSILVER', 'QUIKSILVER INSIDE LINES SS BEI', 19, 0, 'Beige', 'camisetas de manga corta Quiksilver Inside lines ss beige', 'view/img/camisetas-de-manga-corta-quiksilver-inside-lines-ss-beige.jpg', 'Ropa', 'Hombre', '19'),
('VN0A45DPBLK', 'vans', 'VANS EASY BOX SNAPBACK NEGRO', 20, 0, 'Negro', 'gorras Vans Easy box snapback negro', 'view/img/gorras-vans-easy-box-snapback-negro.jpg', 'Accesorio', 'Hombre', '1'),
('VN0A4BG37D5', 'vans', 'VANS FLYING V FT BOXY MORADO', 30, 0, 'Morado', 'sudaderas con capucha Vans Flying v ft boxy morado', 'view/img/sudaderas-con-capucha-vans-flying-v-ft-boxy-morado.jpg', 'Ropa', 'Mujer', '0'),
('VN0A38G2UBS', 'vans', 'VANS OLD SKOOL 36 DX MULTICOLO', 51, 43, 'negro', 'zapatillasVans Old skool 36 dx multicolor', 'view/img/zapatillas-vans-old-skool-36-dx-multicolor.png', 'Calzado', 'Mujer', '0'),
('VN0A3UI6ZTV', 'vans', 'VANS REALM BACKPACK MULTICOLOR', 29, 0, 'Multicolor', 'mochilas Vans Realm backpack multicolor', 'view/img/mochilas-vans-realm-backpack-multicolor.jpg', 'Accesorio', 'Mujer', '1'),
('VN0A3DZ3TBI', 'vans', 'VANS STYLE 36 NEGRO', 48, 40, 'negro', 'zapatillaszapatillas Vans Style 36 negro', 'view/img/zapatillas-vans-style-36-negro.png', 'Calzado', 'Mujer', '0'),
('AQ7460-202', 'vans', 'VANS TNT ADVANCED PROTOTYPE VE', 54, 41, 'VERDE', 'zapatillas Vans Tnt advanced prototype verde', 'view/img/zapatillas-vans-tnt-advanced-prototype-verde.png', 'Calzado', 'Niño', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `code` varchar(10) CHARACTER SET latin1 NOT NULL,
  `brand` varchar(50) CHARACTER SET latin1 NOT NULL,
  `model` varchar(250) CHARACTER SET latin1 NOT NULL,
  `price` varchar(10) CHARACTER SET latin1 NOT NULL,
  `size` varchar(10) CHARACTER SET latin1 NOT NULL,
  `colour` varchar(20) CHARACTER SET latin1 NOT NULL,
  `description` varchar(250) CHARACTER SET latin1 NOT NULL,
  `category` varchar(20) CHARACTER SET latin1 NOT NULL,
  `sex` varchar(10) CHARACTER SET latin1 NOT NULL,
  `images` varchar(255) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shop`
--

INSERT INTO `shop` (`code`, `brand`, `model`, `price`, `size`, `colour`, `description`, `category`, `sex`, `images`) VALUES
('TO154B00J', 'Tommy Jeans', 'FLAG SNOOD - Bufanda', '39,95 €', 'One size', 'blue', 'Composición y cuidados <br> Material exterior: 100% algodón <br> Material/composición: Tejido de algodón <br> Características del producto <br> Cuello/escote: Cuello redondo <br> Estampado: Estampado <br> Talla y corte <br> Ajuste: Normal <br> Largo:', 'accessories', 'Unixes', 'view/img/Archivo_000.png'),
('NE354Q02J', 'New Era', 'ESSENTIAL - Gorra', '19,95 €', 'M', 'Pink', 'Composición y cuidados <br> Material exterior: 100% algodón <br> Cuidados: No lavar', 'accessories', 'Unisex', 'view/img/Archivo_003.png'),
('VA254O00I', 'Vans', 'OLD SKOOL - Mochila', '37,95 €', 'One size', 'black', 'Características del producto <br> Compartimentos: Compartimento para portátil <br> Cierre: Cremallera  <br> Detalles: Cremallera de dos direcciones <br> Talla y corte <br> Altura: 44 cm <br> Largo: 32 cm <br> Ancho: 11 cm <br> Asa: 6 cm', 'accessories', 'Unisex', 'view/img/Archivo_006.png'),
('AD152P00I', 'adidas Originals', 'BASE CLASS UNISEX - Gorra', '17,95 €', 'M', 'black', 'Talla y corte <br> Circunferencia: 58 cm', 'accessories', 'Unisex', 'view/img/Archivo_010.png'),
('C1452N000', 'Carhartt WIP', 'KICKFLIP BACKPACK - Mochila', '75,00 €', 'One size', 'green', 'Características del producto <br> Cierre: Cremallera <br> Estampado: Camuflaje <br> Talla y corte Altura: 45 cm  <br> Largo: 27 cm  <br> Ancho: 18 cm  <br> Asa: 6 cm', 'accessories', 'Unisex', 'view/img/Archivo_018.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `type` varchar(20) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `token_email` varchar(250) NOT NULL,
  `activate` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `type`, `avatar`, `token_email`, `activate`) VALUES
('eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJpYXQiOjE2MjE5NjMxMDYsImV4cCI6MTYyMTk2NjcwNiwibmFtZSI6Imp1YmVsbHRvbHMifQ.2re85Wf5FWitr5ljVWQNbKHX776WT3pacgxjicmOuO8', 'jubelltols', 'jubelltols@gmail.com', '$2y$10$nAUC9yQNmN/zak5ISJf.HeLEUr8gdtU6nC6tHMYTIPjdIEmATe30K', 'client', 'https://robohash.org/2cd5d4fe8b458a33af1d478c761d0022', '2276d7e6a3d6b2c3598f', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
