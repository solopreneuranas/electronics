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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  `productname` text,
  `picture` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`productid`),
  KEY `categoryid_idx` (`categoryid`),
  KEY `brandid_idx` (`brandid`),
  CONSTRAINT `brandid` FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`),
  CONSTRAINT `categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,25,23,'Smart Watch Dual Bluetooth 5.0 connectivity','69ffb6f3-ed8b-4758-adc8-48263e5f2976.png'),(2,28,32,'Galaxy S23','fb62f141-515f-4fa8-b1a9-bb310e8bf1c5.jpg'),(11,49,73,'Powerful Base Headphone','9daed278-4c91-4c03-b849-55f66d63a617.png'),(12,25,74,'Smart Watch with Fitness Tracker','9e705a20-f1b0-4aa3-9a07-40a25ceea909.png'),(13,49,76,'Earbuds with Ergonomic and Baseful','33163951-07bf-43da-a384-6575e0ae8345.png'),(14,49,73,'Wireless and Baseful Earbuds','a587f864-93fd-4db0-8f61-41c4ff40e089.png'),(15,49,65,'Stylish and Ergonomic Headphone','a269b200-fcd1-4cb8-86a9-5438b4dfb924.png'),(16,47,34,'Laptop Intel Core i3 12th Gen','125233c3-74f1-42a5-b054-f5c9cceeeccf.webp'),(17,25,75,'Smart Watch with Sports Mode','e45639e4-f288-4243-98a1-b9d560ca1024.webp'),(18,25,40,'Smart watch with Bluetooth Calling','9c813ccc-dede-4090-8f8e-ded464d7ba4c.webp'),(19,25,74,'Dazzle Plus Smartwatch','a808a5f8-0496-49dd-beea-40fa4e25f8cf.webp'),(20,47,33,'Lapotp Intel Celeron (15.6 inch, core i5, 11th Gen)','60c97826-2d5c-4c3e-a019-36bd9fb9abf0.webp'),(21,47,57,'Laptop Ryzen 5 (16 inches, Windows 11)','09d838e0-d994-46ec-b1d6-7a217961b948.webp'),(22,47,33,'Lapop Intel Core i5 11th Gen (15.6 inch, Windows 10)','16ceabda-283d-4794-8c69-11c129667327.webp'),(23,47,56,'Laptop Intel Core i3 10th Gen (15.6 inch  Windows 10)','6319a9ea-ff4f-47fb-ab2b-5a4cdceccfa6.webp'),(24,47,34,'Laptop Intel Core i5 12th Gen (Windows 11, 15.6 inch)','a6888138-7f63-4d04-a3ba-52701b5a010d.webp'),(25,28,77,'iphone 13','09aa91e3-02be-4452-8881-d0ebf434a4a1.webp'),(26,28,25,'Y16','15b12a4a-a2e6-4741-85ec-1a3b6233f0a7.webp'),(27,28,26,'Reno 10','48e07092-42b1-49cd-a7f0-6762fbc3f649.webp'),(28,28,26,'A78 Pro','3d61f15b-605f-419c-b4a6-234ea746141b.webp'),(29,49,76,'TWS Earbuds with Bluetooth 5.0 Connectivity & Environmental Noise','80ab118c-a996-416b-a071-61300f57c912.webp'),(30,49,64,'TWS Earbuds with Environmental Noise Cancellation ','d199bd19-981a-4695-b3a8-1c3be73286ef.webp'),(31,49,76,'MWS Earbuds with Environmental Noise Cancellation','1f91eb6b-4c59-4679-a1ac-c427ac69ea54.webp');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
