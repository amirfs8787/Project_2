-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2017 at 01:29 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrators`
--

CREATE TABLE `administrators` (
  `ID` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(999) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrators`
--

INSERT INTO `administrators` (`ID`, `name`, `role`, `phone`, `email`, `password`, `image`) VALUES
(1, 'Amir Liberman', 'Owner', '555-642-2222', 'amir@amirschool.com', '96e79218965eb72c92a549dd5a330112', 'person4.PNG'),
(2, 'Bob Marley', 'Manager', '333-545-8886', 'bob@amirschool.com', '52c69e3a57331081823331c4e69d3f2e', 'person2.PNG'),
(3, 'Reg Dude', 'Sales', '321-554-4444', 'reg@amirschool.com', '96e79218965eb72c92a549dd5a330112', 'person3.PNG');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `ID` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(7999) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`ID`, `name`, `description`, `image`) VALUES
(1, 'Biochemistry', 'A great course with lots of chemistry and lots of biology', 'course3.PNG'),
(2, 'Calculus', 'A very difficult course in mathematics.  It is great and fun.', 'course2.PNG'),
(3, 'Astrophysics 1', 'A course designed for those that are into physics and are into astro.  Astro is great.  Physics is great.', 'course1.PNG'),
(4, 'Nanotechnology 2.0', 'A course dealing in technologies.  It also deals in nano stuff.  Small stuff, big technology.', 'course3.PNG'),
(5, 'Nuclearfusion', 'The study of fusion with nuclear energy.  Students in this course are required to study for five years at least.  It is very interesting', 'course2.PNG'),
(100, 'new', 'aaa', 'course2.PNG');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `IDperRow` int(255) NOT NULL,
  `ID` int(4) NOT NULL,
  `course_id` int(2) DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`IDperRow`, `ID`, `course_id`, `name`, `phone`, `email`, `image`) VALUES
(1, 1, 2, 'Amir Liberman', '112-664-9856', 'amirlib@yeah.com', 'person1.PNG'),
(2, 1, 4, 'Amir Liberman', '112-664-9856', 'amirlib@yeah.com', 'person1.PNG'),
(4, 3, 1, 'Boba Marasukaa', '3332268912', 'bobm@yahoo.com1', 'person3.PNG'),
(6, 4, 5, 'Halo Pond', '351-988-6254', 'hapo@gmail.com', 'person4.PNG'),
(7, 5, 2, 'Bobby Wayans', '952-885-3264', 'bway@gmail.com', 'person2.PNG'),
(8, 5, 5, 'Bobby Wayans', '952-885-3264', 'bway@gmail.com', 'person2.PNG'),
(9, 1, 1, 'Amir Liberman', '112-664-9856', 'amirlib@yeah.com', 'person1.PNG'),
(10, 2, 3, 'Danny Smith', '3368859846', 'danny@gmail.com', 'person4.PNG'),
(12, 3, 2, 'Boba Marasukaa', '3332268912', 'bobm@yahoo.com1', 'person3.PNG'),
(13, 5, 3, 'Bobby Wayans', '952-885-3264', 'bway@gmail.com', 'person2.PNG'),
(23, 3, 5, 'Boba Marasukaa', '3332268912', 'bobm@yahoo.com1', 'person3.PNG'),
(43, 1, 5, 'Amir Liberman', '112-664-9856', 'amirlib@yeah.com', 'person1.PNG'),
(48, 4, 1, 'Halo Pond', '351-988-6254', 'hapo@gmail.com', 'person4.PNG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`IDperRow`),
  ADD KEY `course_id` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrators`
--
ALTER TABLE `administrators`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `IDperRow` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
