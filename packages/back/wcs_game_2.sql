-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: wcs_game
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'Wild Breakfast',100,'69c7b5'),(2,'Organise RNCP',200,'3b5998'),(3,'Buy Advertising',350,'bf49a0'),(4,'Talk',100,'cf0921'),(5,'Networking',50,'ff6c33'),(6,'Organize a Trade Fair',450,'55c671'),(7,'Internal Management',100,'ff83da'),(8,'Weekly Meeting',100,'69c7b5'),(9,'Prepare a Course',100,'3b5998'),(10,'Give a Course',100,'bf49a0'),(11,'Correction of a Wild Circus Candidate',100,'cf0921'),(12,'Workshop or Live Coding',100,'ff6c33');
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_manager_activities_calendar`
--

LOCK TABLES `campus_manager_activities_calendar` WRITE;
/*!40000 ALTER TABLE `campus_manager_activities_calendar` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicator`
--

LOCK TABLES `indicator` WRITE;
/*!40000 ALTER TABLE `indicator` DISABLE KEYS */;
INSERT INTO `indicator` VALUES (1,'Reputation',0,30),(2,'Budget',0,5000),(3,'ActualStudentsNumber',0,0),(4,'FutureStudentsNumber',0,0),(5,'ForecastSalesTurnover',0,0),(6,'Reputation',1,30),(7,'Budget',1,4700),(8,'ActualStudentsNumber',1,0),(9,'FutureStudentsNumber',1,0),(10,'ForecastSalesTurnover',1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mutator`
--

LOCK TABLES `mutator` WRITE;
/*!40000 ALTER TABLE `mutator` DISABLE KEYS */;
INSERT INTO `mutator` VALUES (1,'incReputation',1,5,NULL,NULL,NULL,NULL),(2,'decBudget',2,-100,NULL,NULL,NULL,NULL),(3,'incReputation',1,5,1,NULL,NULL,NULL),(4,'decBudget',2,-100,1,NULL,NULL,NULL),(5,'incReputation',1,2,2,NULL,NULL,NULL),(6,'decBudget',2,-20,2,NULL,NULL,NULL),(7,'incReputation',1,4,3,NULL,NULL,NULL),(8,'decBudget',2,-50,3,NULL,NULL,NULL),(9,'incReputation',1,3,4,NULL,NULL,NULL),(10,'decBudget',2,-40,4,NULL,NULL,NULL),(11,'incReputation',1,0.1,NULL,NULL,NULL,1),(12,'decBudget',2,-80,NULL,NULL,NULL,1),(13,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,1),(14,'incReputation',1,0.2,NULL,NULL,NULL,2),(15,'decBudget',2,-200,NULL,NULL,NULL,2),(16,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,2),(17,'incReputation',1,0.5,NULL,NULL,NULL,3),(18,'decBudget',2,-80,NULL,NULL,NULL,3),(19,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,3),(20,'incReputation',1,0.4,NULL,NULL,NULL,4),(21,'decBudget',2,-80,NULL,NULL,NULL,4),(22,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,4),(23,'decBudget',2,-50,NULL,NULL,NULL,5),(24,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,5),(25,'decReputation',1,0.6,NULL,NULL,NULL,6),(26,'decBudget',2,-80,NULL,NULL,NULL,6),(27,'incFutureStudentsNumber',3,1,NULL,NULL,NULL,6),(28,'decBudget',2,-50,NULL,NULL,NULL,7),(29,'decReputation',1,0.6,NULL,NULL,NULL,8),(30,'decBudget',2,-80,NULL,NULL,NULL,8),(31,'decReputation',1,0.6,NULL,NULL,NULL,9),(32,'decBudget',2,-80,NULL,NULL,NULL,9),(33,'decReputation',1,0.6,NULL,NULL,NULL,10),(34,'decBudget',2,-80,NULL,NULL,NULL,10),(35,'decReputation',1,0.6,NULL,NULL,NULL,11),(36,'decBudget',2,-80,NULL,NULL,NULL,11),(37,'decReputation',1,0.6,NULL,NULL,NULL,12),(38,'decBudget',2,-80,NULL,NULL,NULL,12),(39,'incReputation',6,2,NULL,NULL,1,NULL),(40,'decBudget',7,-80,NULL,NULL,1,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Link',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_buildings`
--

LOCK TABLES `player_buildings` WRITE;
/*!40000 ALTER TABLE `player_buildings` DISABLE KEYS */;
INSERT INTO `player_buildings` VALUES (1,0,'classroom',1,500),(2,0,'parking',1,200),(3,0,'cafeteria',1,350),(4,0,'dorms',1,250);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_campus_manager`
--

LOCK TABLES `player_campus_manager` WRITE;
/*!40000 ALTER TABLE `player_campus_manager` DISABLE KEYS */;
INSERT INTO `player_campus_manager` VALUES (1,1,'Maxime',300);
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_teacher`
--

LOCK TABLES `player_teacher` WRITE;
/*!40000 ALTER TABLE `player_teacher` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_activities_calendar`
--

LOCK TABLES `teacher_activities_calendar` WRITE;
/*!40000 ALTER TABLE `teacher_activities_calendar` DISABLE KEYS */;
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

-- Dump completed on 2019-11-16 17:37:06
