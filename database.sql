-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: INT3139
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_userID` int DEFAULT NULL,
  `comment_postID` int DEFAULT NULL,
  `comment_data` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_user_idx` (`comment_userID`),
  KEY `comment_post_idx` (`comment_postID`),
  CONSTRAINT `comment_post` FOREIGN KEY (`comment_postID`) REFERENCES `post` (`post_id`),
  CONSTRAINT `comment_user` FOREIGN KEY (`comment_userID`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (23,1,4,'a'),(24,1,4,'a'),(25,1,4,'a'),(26,1,4,'a'),(27,1,4,'as'),(28,1,4,'asd'),(29,1,4,'f'),(30,1,4,'fd'),(31,1,5,'f');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `friend_from` int NOT NULL,
  `friend_to` int NOT NULL,
  KEY `friend_to_idx` (`friend_to`),
  KEY `friend_from` (`friend_from`),
  CONSTRAINT `friend_from` FOREIGN KEY (`friend_from`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friend_to` FOREIGN KEY (`friend_to`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,1),(2,2),(10,10),(12,12),(14,14),(1,2),(2,1),(15,15),(16,16),(17,17),(18,18),(19,19),(20,20),(21,21),(22,22);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_userID` int NOT NULL,
  `post_data` text NOT NULL,
  `post_date` datetime NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `post_user_idx` (`post_userID`),
  CONSTRAINT `user_post` FOREIGN KEY (`post_userID`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'A example post ','2020-10-23 21:45:22'),(2,1,'A Second example post ','2020-10-23 21:45:32'),(3,1,'12341234','2020-10-26 21:31:20'),(4,1,'Tuan nhu cac','2020-11-26 13:14:31'),(5,1,'f','2020-12-03 11:30:32'),(6,1,'f','2020-12-03 11:31:52'),(7,1,'fd','2020-12-03 11:31:55'),(8,1,'f','2020-12-03 11:32:07');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `reactions_userID` int DEFAULT NULL,
  `reactions_postID` int DEFAULT NULL,
  KEY `reactions_user_idx` (`reactions_userID`),
  KEY `reactions_post_idx` (`reactions_postID`),
  CONSTRAINT `reactions_post` FOREIGN KEY (`reactions_postID`) REFERENCES `post` (`post_id`),
  CONSTRAINT `reactions_user` FOREIGN KEY (`reactions_userID`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,3),(1,2),(2,2),(1,4);
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_from` int NOT NULL,
  `request_to` int NOT NULL,
  KEY `request_from_idx` (`request_from`),
  KEY `request_to_idx` (`request_to`),
  CONSTRAINT `request_from` FOREIGN KEY (`request_from`) REFERENCES `user` (`user_id`),
  CONSTRAINT `request_to` FOREIGN KEY (`request_to`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,10),(1,12),(1,16);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_validation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`user_email`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a@a','a','TESTER',NULL),(2,'b@b','bbb','TESTER BETA',NULL),(10,'a@bcde','abcde','SUPER ADMIN',NULL),(12,'a@aaa','abcde','SUPER ADMIN',NULL),(14,'a@123','abcde','SUPER ADMIN',NULL),(15,'abcd@a','a','SUPER OMEGA TESTER',NULL),(16,'123@123','123','SUPER OMEGA TESTER 2',NULL),(17,'123123@123','123','SUPER OMEGA TESTER 3',NULL),(18,'142@123','123','SUPER OMEGA TESTER 4',NULL),(19,'123123123@123','123','SUPER OMEGA TESTER 5',NULL),(20,'12@1','123','SUPER OMEGA TESTER 6',NULL),(21,'1@1','1','1',NULL),(22,'ab@a','a','a',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-04 17:16:16
