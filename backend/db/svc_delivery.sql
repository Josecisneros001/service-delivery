-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2021 at 10:00 PM
-- Server version: 10.4.14-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u996757958_svc_delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `address_info` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_lat` float NOT NULL,
  `location_lng` float NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `id` int(11) NOT NULL,
  `user_sender_id` int(11) NOT NULL,
  `user_receiver_id` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_receiver_id` int(11) NOT NULL,
  `user_sender_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` int(11) NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_lat` float NOT NULL,
  `location_lng` float NOT NULL,
  `location_radius` float NOT NULL,
  `is_service_fee_per_hour` tinyint(1) NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_photos`
--

CREATE TABLE `service_photos` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recovery_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_phone_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_proof_of_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_service_provider` tinyint(1) NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE VIEW `users_no_password` AS
SELECT `id`, `first_name`, `last_name`, `email`, `recovery_email`, `phone_number`, `alt_phone_number`, `profile_picture`, `file_id`, `file_proof_of_address`, `is_service_provider`, `registered_on`
FROM `users`;

-- --------------------------------------------------------

--
-- Table structure for table `work_hours`
--

CREATE TABLE `work_hours` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `hour` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `registered_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_photos`
--
ALTER TABLE `service_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `work_hours`
--
ALTER TABLE `work_hours`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_photos`
--
ALTER TABLE `service_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `work_hours`
--
ALTER TABLE `work_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DELIMITER //
CREATE FUNCTION getDistance(latitudA float, longitudA float, latitudB float, longitudB float)
RETURNS float
BEGIN
   DECLARE R INT;
   DECLARE dLat float;
   DECLARE dLong float;
   DECLARE a float;
   DECLARE c float;
   DECLARE d float;
   SET R= 6378137; /* EARTH RADIUS */
   SET dLat =  RADIANS(latitudB - latitudA);
   SET dLong =  RADIANS(longitudB - longitudA);
   SET a = SIN(dLat / 2.0) * SIN(dLat / 2.0) + COS(RADIANS(latitudA)) * COS( RADIANS(latitudB)) * SIN(dLong / 2.0) * SIN(dLong / 2.0);
   SET c = 2.0 * ATAN2(SQRT(a), SQRT(1 - a));
   SET d = R * c;
   return d; 
END //
DELIMITER ;


DELIMITER //
CREATE FUNCTION doIntersect(latitudA float, longitudA float, radioA float, latitudB float, longitudB float, radioB float)
RETURNS boolean
BEGIN
  DECLARE distance INT;
  DECLARE radius float;
  SET distance = getDistance(latitudA, longitudA, latitudB, longitudB);
  SET radius = radioA + radioB;
  return distance < radius;
END //
DELIMITER ;
