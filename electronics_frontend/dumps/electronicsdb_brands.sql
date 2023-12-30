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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `brands` (
  `brandid` int(11) NOT NULL AUTO_INCREMENT,
  `brandname` varchar(45) DEFAULT NULL,
  `categoryid` varchar(45) DEFAULT NULL,
  `logo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`brandid`),
  KEY `categoryname_idx` (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (20,'Samsung','22','a6b1e1a0-4e8b-4da0-a099-0f7729803610.webp'),(23,'MI','25','8c9f0f97-7464-42e8-bb6c-e3bf1b211559.webp'),(24,'LG','22','d426605f-6235-41c4-8b44-b05f49efeca8.webp'),(25,'Vivo','28','8d33f370-4577-4b26-8449-614d60084709.webp'),(26,'Oppo','28','1a314ac3-cd73-43fc-8eb2-a6b2010e9707.webp'),(27,'Croma','29','89266052-b5da-4082-a814-bc81c82abc58.webp'),(32,'Samsung','28','f6882ba4-2ea6-40bb-9c45-ba548fb26f41.webp'),(33,'Dell','47','40dc5a53-a0f9-425d-a2ed-b0aee44490c3.webp'),(34,'HP','47','74be88b9-dfbe-4539-94f5-23082d89b15d.webp'),(35,'MI','22','6fd28974-9b39-441c-b6b3-73bceef1f219.webp'),(36,'Samsung','23','5426fcb4-a463-4d54-85b6-18c2dd7e35f1.webp'),(37,'Voltas','23','a58895be-01bd-454f-98f7-6bf3537f5803.png'),(38,'LG','23','89739503-019f-4e21-8e0e-6f6a52c41126.webp'),(39,'Oppo','25','3a42d924-e2ef-463d-8a2b-4b38233c7506.webp'),(40,'Samsung','25','7847b34c-c3ba-4e5d-b856-221290a76582.webp'),(41,'Vivo','25','bb98bf72-54dc-4843-8615-3f8313ed8c9b.webp'),(42,'MI','28','2e5f5c71-09ca-4923-ac81-9dc9bd672515.webp'),(43,'Samsung','29','a92c0a1f-f8e4-459e-81ee-7a788a2c80bb.webp'),(44,'LG','29','02d89479-0ae6-4850-ba94-0f5829a14802.webp'),(45,'Samsung','45','74e6d21a-d4d1-4cce-a228-8e1f706b075e.webp'),(46,'MI','45','7318f382-f4ea-4539-b86b-cc3fa90c311b.webp'),(47,'Vivo','45','0aec0696-5aa5-498a-95b6-ac432d61f1f7.webp'),(48,'Oppo','45','a6f0deba-ca09-4719-bcdc-5bf252ee5590.webp'),(49,'Croma','45','87c96495-6746-4ea4-b2fa-bb30da46fa7a.webp'),(50,'Croma','46','db4af9b8-6642-40e2-a62a-5f18243c9dfa.webp'),(51,'Samsung','46','2f8193b8-03eb-4c01-a561-edd6bd754a7a.webp'),(52,'Voltas','46','3d8efe40-6b5a-4260-a51e-f9829cbeaf08.png'),(53,'LG','46','e7e56101-74a5-424d-ae6b-dc46fb96f4a3.webp'),(56,'Samsung','47','e27e32ad-1eb1-4b13-ba63-f2784919c288.webp'),(57,'MI','47','8e5141aa-6a04-4606-aa89-404dcf7f9a45.webp'),(58,'Samsung','48','0f40ee06-e417-4e2b-b3ee-a98b97a14114.webp'),(59,'Dell','48','96eaa0d9-7da6-40c7-a599-1d95df148a89.webp'),(60,'HP','48','e9cc3a5a-dff7-4239-a89c-7d290edfed16.webp'),(61,'MI','48','910d4276-fd01-4745-8740-a3fbb1b222c1.webp'),(62,'LG','48','b8f8895c-daba-4464-92f5-fc94532844ec.webp'),(63,'Croma','48','6b6ca5d5-6a47-414f-a9fc-708132e7bc9c.jpg'),(64,'JBL','49','703ff382-d9ea-4fda-bbc2-4727d91fbef3.webp'),(65,'Zebronics','49','98575372-dbb9-428f-8d4f-45be9d6cac58.webp'),(66,'Sony','49','9dbdaae2-8b24-4856-ae09-c43552bf21f4.webp'),(67,'Sony','22','4d526c76-bad6-4610-a607-1c07514c0683.webp'),(68,'Sony','25','29e1989e-f851-42be-a7a9-b2515eec826b.webp'),(69,'Sony','28','f61108f5-f959-4125-8f3b-fa7e790dc2af.webp'),(70,'Sony','45','68383f4e-2160-481f-ad96-da7c9f72b8a3.webp'),(71,'Sony','46','e8a41308-4f8b-4bd9-8eb4-e0318598417c.webp'),(72,'Sony','48','ffe22754-6961-4451-893a-662b644c7d8e.webp'),(73,'Noise','49','2c4369bc-5153-452b-86b4-3793fbc1cc1b.jpg'),(74,'Noise','25','940b4be4-ebe1-431b-b325-7cedf7ef4ebb.jpg'),(75,'Boat','25','cf78538e-0f37-4897-a519-f5ab0de93da7.avif'),(76,'Boat','49','0b34f627-bf49-4693-b06f-f3898d80d640.avif'),(77,'Apple','28','a2536b15-3987-4387-89a1-8852fdb71458.webp');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 22:18:56
