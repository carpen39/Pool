-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2016 at 05:50 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pool`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `NumberOfWins` int(11) DEFAULT '0',
  `NumberOfGames` int(11) DEFAULT '0',
  `ELOScore` int(11) DEFAULT '1500',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `Name`, `NumberOfWins`, `NumberOfGames`, `ELOScore`) VALUES
(1, 'Test User 1', 4, 5, 1500),
(2, 'Test User 1', 1, 5, 1484),
(3, 'Test User 1', 4, 4, 1515),
(4, 'Test Player 4', 1, 5, 1499),
(5, 'Test Player 5', 1, 2, 1500),
(6, 'Test 1234', 1, 1, 1500),
(7, 'qwe3twtgweage', 0, 1, 1500),
(8, 'fagegssgs', 0, 1, 1500),
(9, 'awfawf', 1, 1, 1500);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
