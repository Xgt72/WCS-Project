-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: wcs_game
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `value` int(11) NOT NULL,
  `color` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'Wild Breakfast',100,'69c7b5'),(2,'Organise RNCP',200,'3b5998'),(3,'Buy Advertising',350,'bf49a0'),(4,'Talk',100,'cf0921'),(5,'Networking',50,'ff6c33'),(6,'Organize a Trade Fair',450,'55c671'),(7,'Internal Management',100,'ff83da'),(8,'Weekly Meeting',100,'69c7b5'),(9,'Prepare a Course',100,'3b5998'),(10,'Give a Course',100,'bf49a0'),(11,'Correction of a Wild Circus Candidate',100,'cf0921'),(12,'Workshop or Live Coding',100,'ff6c33'),(13,'Buy Advertising',350,'bf49a0'),(14,'Organise RNCP',200,'3b5998'),(15,'Networking',50,'ff6c33'),(19,'Give a Course',100,'bf49a0'),(20,'Weekly Meeting',100,'69c7b5'),(21,'Organise RNCP',200,'3b5998'),(22,'Talk',100,'cf0921'),(23,'Networking',50,'ff6c33');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_manager_activities_calendar`
--

DROP TABLE IF EXISTS `campus_manager_activities_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_manager_activities_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campus_manager_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `morning` tinyint(4) NOT NULL,
  `afternoon` tinyint(4) NOT NULL,
  `day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_manager_activities_calendar`
--

LOCK TABLES `campus_manager_activities_calendar` WRITE;
/*!40000 ALTER TABLE `campus_manager_activities_calendar` DISABLE KEYS */;
INSERT INTO `campus_manager_activities_calendar` VALUES (1,2,13,1,0,5),(2,2,14,0,1,1),(3,2,15,0,1,3),(7,1,21,1,0,1),(8,1,22,0,1,2),(9,1,23,1,0,4);
/*!40000 ALTER TABLE `campus_manager_activities_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indicator`
--

DROP TABLE IF EXISTS `indicator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indicator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `player_id` int(11) NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicator`
--

LOCK TABLES `indicator` WRITE;
/*!40000 ALTER TABLE `indicator` DISABLE KEYS */;
INSERT INTO `indicator` VALUES (1,'Reputation',0,30),(2,'Budget',0,5000),(3,'ActualStudentsNumber',0,0),(4,'FutureStudentsNumber',0,0),(5,'ForecastSalesTurnover',0,0),(11,'Reputation',2,30),(12,'Budget',2,3800),(13,'ActualStudentsNumber',2,0),(14,'FutureStudentsNumber',2,0),(15,'ForecastSalesTurnover',2,0),(16,'Reputation',3,30),(17,'Budget',3,5000),(18,'ActualStudentsNumber',3,0),(19,'FutureStudentsNumber',3,0),(20,'ForecastSalesTurnover',3,0);
/*!40000 ALTER TABLE `indicator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mutator`
--

DROP TABLE IF EXISTS `mutator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mutator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `value` float NOT NULL,
  `playerBuildingId` int(11) DEFAULT NULL,
  `playerTeacherId` int(11) DEFAULT NULL,
  `playerCampusManagerId` int(11) DEFAULT NULL,
  `activityId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4df4bdf0923e0067319eb9ad51d` (`playerBuildingId`),
  KEY `FK_9ec712d15d6ed180529f56e39b8` (`playerTeacherId`),
  KEY `FK_1a7bae564f3388867899117806c` (`playerCampusManagerId`),
  KEY `FK_1e42b455289969b36a23f7b5b85` (`activityId`),
  CONSTRAINT `FK_1a7bae564f3388867899117806c` FOREIGN KEY (`playerCampusManagerId`) REFERENCES `player_campus_manager` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_1e42b455289969b36a23f7b5b85` FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_4df4bdf0923e0067319eb9ad51d` FOREIGN KEY (`playerBuildingId`) REFERENCES `player_buildings` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_9ec712d15d6ed180529f56e39b8` FOREIGN KEY (`playerTeacherId`) REFERENCES `player_teacher` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mutator`
--

LOCK TABLES `mutator` WRITE;
/*!40000 ALTER TABLE `mutator` DISABLE KEYS */;
INSERT INTO `mutator` VALUES (1,'incReputation',1,5,NULL,NULL,NULL,NULL),(2,'decBudget',2,-100,NULL,NULL,NULL,NULL),(3,'incReputation',1,5,1,NULL,NULL,NULL),(4,'decBudget',2,-100,1,NULL,NULL,NULL),(5,'incReputation',1,2,2,NULL,NULL,NULL),(6,'decBudget',2,-20,2,NULL,NULL,NULL),(7,'incReputation',1,4,3,NULL,NULL,NULL),(8,'decBudget',2,-50,3,NULL,NULL,NULL),(9,'incReputation',1,3,4,NULL,NULL,NULL),(10,'decBudget',2,-40,4,NULL,NULL,NULL),(11,'incReputation',1,0.1,NULL,NULL,NULL,1),(12,'decBudget',2,-100,NULL,NULL,NULL,1),(13,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,1),(14,'incReputation',1,0.2,NULL,NULL,NULL,2),(15,'decBudget',2,-200,NULL,NULL,NULL,2),(16,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,2),(17,'incReputation',1,0.5,NULL,NULL,NULL,3),(18,'decBudget',2,-350,NULL,NULL,NULL,3),(19,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,3),(20,'incReputation',1,0.4,NULL,NULL,NULL,4),(21,'decBudget',2,-100,NULL,NULL,NULL,4),(22,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,4),(23,'decBudget',2,-50,NULL,NULL,NULL,5),(24,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,5),(25,'decReputation',1,0.6,NULL,NULL,NULL,6),(26,'decBudget',2,-450,NULL,NULL,NULL,6),(27,'incFutureStudentsNumber',4,1,NULL,NULL,NULL,6),(28,'decBudget',2,-100,NULL,NULL,NULL,7),(29,'decReputation',1,0.6,NULL,NULL,NULL,8),(30,'decBudget',2,-100,NULL,NULL,NULL,8),(31,'decReputation',1,0.6,NULL,NULL,NULL,9),(32,'decBudget',2,-100,NULL,NULL,NULL,9),(33,'decReputation',1,0.6,NULL,NULL,NULL,10),(34,'decBudget',2,-100,NULL,NULL,NULL,10),(35,'decReputation',1,0.6,NULL,NULL,NULL,11),(36,'decBudget',2,-100,NULL,NULL,NULL,11),(37,'decReputation',1,0.6,NULL,NULL,NULL,12),(38,'decBudget',2,-100,NULL,NULL,NULL,12),(39,'incReputation',11,2,NULL,NULL,1,NULL),(40,'decBudget',12,-80,NULL,NULL,1,NULL),(41,'incReputation',11,5,5,NULL,NULL,NULL),(42,'decBudget',12,-100,5,NULL,NULL,NULL),(48,'incReputation',11,2,NULL,NULL,2,NULL),(49,'decBudget',12,-80,NULL,NULL,2,NULL),(50,'incReputation',11,5,NULL,1,NULL,NULL),(51,'decBudget',12,-100,NULL,1,NULL,NULL),(52,'incReputation',11,2,6,NULL,NULL,NULL),(53,'decBudget',12,-20,6,NULL,NULL,NULL),(54,'incReputation',11,0.5,NULL,NULL,NULL,13),(55,'decBudget',12,-350,NULL,NULL,NULL,13),(56,'incFutureStudentsNumber',14,0.29,NULL,NULL,NULL,13),(57,'incReputation',11,0.2,NULL,NULL,NULL,14),(58,'decBudget',12,-200,NULL,NULL,NULL,14),(59,'incFutureStudentsNumber',14,2.58,NULL,NULL,NULL,14),(60,'decBudget',12,-50,NULL,NULL,NULL,15),(61,'incFutureStudentsNumber',14,0.22,NULL,NULL,NULL,15),(69,'decReputation',11,0.6,NULL,NULL,NULL,19),(70,'decBudget',12,-100,NULL,NULL,NULL,19),(71,'decReputation',11,0.6,NULL,NULL,NULL,20),(72,'decBudget',12,-100,NULL,NULL,NULL,20),(73,'incReputation',11,0.2,NULL,NULL,NULL,21),(74,'decBudget',12,-200,NULL,NULL,NULL,21),(75,'incFutureStudentsNumber',14,1.57,NULL,NULL,NULL,21),(76,'incReputation',11,0.4,NULL,NULL,NULL,22),(77,'decBudget',12,-100,NULL,NULL,NULL,22),(78,'incFutureStudentsNumber',14,0.63,NULL,NULL,NULL,22),(79,'decBudget',12,-50,NULL,NULL,NULL,23),(80,'incFutureStudentsNumber',14,0.29,NULL,NULL,NULL,23);
/*!40000 ALTER TABLE `mutator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerName` varchar(100) NOT NULL,
  `cyclesNumber` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (2,'Link The Hero',0,'link@gmail.fr','$2a$10$meI/iiJYKupmeiIMUH7fX.iXSDbS254nfUMs4Nzf4iQhmgsUdZr1C');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_buildings`
--

DROP TABLE IF EXISTS `player_buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `isTemplate` tinyint(4) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_buildings`
--

LOCK TABLES `player_buildings` WRITE;
/*!40000 ALTER TABLE `player_buildings` DISABLE KEYS */;
INSERT INTO `player_buildings` VALUES (1,0,'classroom',1,500),(2,0,'parking',1,200),(3,0,'cafeteria',1,350),(4,0,'dorms',1,250),(5,2,'classroom',0,500),(6,2,'parking',0,200);
/*!40000 ALTER TABLE `player_buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_campus_manager`
--

DROP TABLE IF EXISTS `player_campus_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_campus_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_campus_manager`
--

LOCK TABLES `player_campus_manager` WRITE;
/*!40000 ALTER TABLE `player_campus_manager` DISABLE KEYS */;
INSERT INTO `player_campus_manager` VALUES (1,2,'Marylou',300),(2,2,'Clément',300);
/*!40000 ALTER TABLE `player_campus_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_teacher`
--

DROP TABLE IF EXISTS `player_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_teacher`
--

LOCK TABLES `player_teacher` WRITE;
/*!40000 ALTER TABLE `player_teacher` DISABLE KEYS */;
INSERT INTO `player_teacher` VALUES (1,2,'Elisabeth',200);
/*!40000 ALTER TABLE `player_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `school` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_activities_calendar`
--

DROP TABLE IF EXISTS `teacher_activities_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_activities_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `morning` tinyint(4) NOT NULL,
  `afternoon` tinyint(4) NOT NULL,
  `day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_activities_calendar`
--

LOCK TABLES `teacher_activities_calendar` WRITE;
/*!40000 ALTER TABLE `teacher_activities_calendar` DISABLE KEYS */;
INSERT INTO `teacher_activities_calendar` VALUES (1,1,19,0,1,2),(2,1,20,0,1,1);
/*!40000 ALTER TABLE `teacher_activities_calendar` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-29  9:49:39
