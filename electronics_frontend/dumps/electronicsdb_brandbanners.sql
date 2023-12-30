-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: electronicsdb
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brandbanners`
--

DROP TABLE IF EXISTS `brandbanners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `brandbanners` (
  `brandbannersid` int(11) NOT NULL AUTO_INCREMENT,
  `brandid` int(11) DEFAULT NULL,
  `files` text,
  PRIMARY KEY (`brandbannersid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandbanners`
--

LOCK TABLES `brandbanners` WRITE;
/*!40000 ALTER TABLE `brandbanners` DISABLE KEYS */;
INSERT INTO `brandbanners` VALUES (1,23,'351bbf99-83a9-4483-af0e-6a9a6c0d8f47.webp,a9a820a0-ad39-410f-b4a2-2bb337351bbf.webp,cfa9c44d-20b0-4d61-a210-6ad7bc2a6acf.webp,31c1e3e2-15ba-4f98-be35-ffd505f6da3b.webp,31271895-9407-4b58-b61d-59f91e847759.webp'),(2,20,'4e8f4790-79d5-489f-952d-8272776db4fb.webp'),(5,33,'8014f556-e191-4ad3-939a-42244e1d506e.webp,a263371d-806a-4b10-8571-756e457d2b4e.webp'),(6,25,'f55c1caf-44d5-48e6-9c61-cc1ca834a2f9.webp,c3916fb5-dacd-431d-9c32-0e53a81a4deb.webp,db698f57-a978-4467-9f14-4de91c227aa3.webp,21d4903c-8871-4b8c-9e59-666433651b6d.webp'),(7,34,'cac911f4-170f-4cd1-b1c3-ce8af3994be7.webp,209828d7-7788-4332-aba3-3784eaac8836.webp'),(8,77,'c28e149a-a162-466c-aa51-b5f0c85d1948.webp,c33927e4-e935-426a-b394-e1e0d0f4995a.webp,970506f0-1c32-425a-83a5-2b8dc6d97899.webp,87de5db6-8f4c-4ff0-b4af-c7e09d02446d.webp,032325c6-64f0-49ad-b48e-b37ea8c31a7b.webp');
/*!40000 ALTER TABLE `brandbanners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 22:18:55
