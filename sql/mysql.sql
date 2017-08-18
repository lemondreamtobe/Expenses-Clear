# Host: localhost  (Version 5.7.16)
# Date: 2017-08-18 15:28:49
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "t_admin"
#

DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `Admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `Admin_name` varchar(10) NOT NULL,
  `Admin_password` varchar(32) NOT NULL,
  PRIMARY KEY (`Admin_id`),
  UNIQUE KEY `Admin_id_UNIQUE` (`Admin_id`),
  UNIQUE KEY `Admin_name` (`Admin_name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

#
# Data for table "t_admin"
#

INSERT INTO `t_admin` VALUES (8,'hwf','c03223e4c2e74fdac0e5f7469073da26'),(9,'zsy','eb25d21e8a4d7dc52947b61ab26a2694'),(10,'admin','21232f297a57a5a743894a0e4a801fc3'),(11,'test','098f6bcd4621d373cade4e832627b4f6'),(12,'test2','ad0234829205b9033196ba818f7a872b'),(13,'test3','8ad8757baa8564dc136c1e07507f4a98'),(14,'test5','e3d704f3542b44a621ebed70dc0efe13'),(15,'test6','b04083e53e242626595e2b8ea327e525'),(16,'oo','e47ca7a09cf6781e29634502345930a7'),(17,'asd','7815696ecbf1c96e6894b779456d330e'),(24,'zhang','c4ca4238a0b923820dcc509a6f75849b'),(27,'xie','f899139df5e1059396431415e770c6dd'),(29,'t','550a141f12de6341fba65b0ad0433500'),(30,'q','550a141f12de6341fba65b0ad0433500'),(31,'a','550a141f12de6341fba65b0ad0433500'),(32,'b','b59c67bf196a4758191e42f76670ceba');

#
# Structure for table "t_book_student"
#

DROP TABLE IF EXISTS `t_book_student`;
CREATE TABLE `t_book_student` (
  `Id` varchar(35) NOT NULL,
  `Book_num` varchar(15) NOT NULL,
  `Student_num` varchar(15) NOT NULL,
  `borrow_date` date NOT NULL,
  `return_date` date NOT NULL,
  `Money` decimal(5,2) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "t_book_student"
#


#
# Structure for table "t_card"
#

DROP TABLE IF EXISTS `t_card`;
CREATE TABLE `t_card` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `money` decimal(20,3) DEFAULT NULL COMMENT '银行卡',
  `purpose` text CHARACTER SET utf8 COMMENT '使用目的',
  `date` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '时间',
  `symbol` int(1) DEFAULT '0' COMMENT '0表示收入，1表示支出',
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

#
# Data for table "t_card"
#

INSERT INTO `t_card` VALUES (1,1.000,'吃饭','2017-08-17 00:00:00',1,'zhang'),(2,2.000,'py交易','2017-08-17 00:00:00',0,'zhang'),(3,2.000,'买菜','2017-08-17 00:00:00',1,'zhang'),(4,2.000,'买水','2017-08-17 00:00:00',1,'zhang'),(5,2.000,'1','2017-08-17 00:00:00',1,'zhang'),(6,2.000,'1','2017-08-17 16:00:00',1,'zhang'),(7,2.000,'2','2017-08-17 17:00:02',1,'zhang'),(8,2.000,'2','2017-08-17 17:00:02',1,'zhang'),(9,1.000,'1','2017-08-18 14:45:45',1,'zhang');

#
# Structure for table "t_cash"
#

DROP TABLE IF EXISTS `t_cash`;
CREATE TABLE `t_cash` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `money` decimal(20,2) DEFAULT NULL COMMENT '现金',
  `purpose` text CHARACTER SET utf8,
  `date` datetime DEFAULT '0000-00-00 00:00:00',
  `symbol` int(1) DEFAULT '0' COMMENT '0表示收入，1表示支出',
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "t_cash"
#

INSERT INTO `t_cash` VALUES (1,2.00,'py交易','2017-08-17 00:00:00',0,'zhang'),(2,1.00,'吃饭','2017-08-17 00:00:00',1,'zhang'),(3,10.00,'捡到钱','2017-08-17 00:00:00',0,'zhang'),(4,2.00,'3','2017-08-17 00:00:00',1,'zhang'),(5,2.00,'11','2017-08-17 00:00:00',1,'zhang'),(6,2.00,'11','2017-08-17 10:50:00',1,'zhang'),(7,1.00,'1','2017-08-18 14:46:11',1,'zhang'),(8,22.00,'22','2017-08-02 06:30:00',0,'zhang');

#
# Structure for table "t_money"
#

DROP TABLE IF EXISTS `t_money`;
CREATE TABLE `t_money` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL COMMENT '用户',
  `card` decimal(20,3) DEFAULT NULL COMMENT '银行卡',
  `cash` decimal(20,2) DEFAULT NULL COMMENT '现金',
  `yct` decimal(10,2) DEFAULT NULL COMMENT '羊城通',
  `date` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '时间',
  `total` decimal(40,4) DEFAULT NULL COMMENT '剩余资金',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

#
# Data for table "t_money"
#

INSERT INTO `t_money` VALUES (5,'xie',1000000000.000,100.00,100.00,'2017-08-11 00:00:00',NULL),(6,'zhang',99987.000,24.00,97.00,'2017-08-14 14:00:00',100108.0000),(8,'t',444.000,444.00,44.00,'2017-08-16 11:43:45',NULL),(9,'q',444.000,444.00,44.00,'2017-08-16 11:45:35',44444444.0000),(10,'a',444.000,444.00,44.00,'2017-08-16 11:46:44',44444444.0000),(11,'b',1111.000,1111.00,111.00,'2017-08-16 11:49:01',2333.0000);

#
# Structure for table "t_yct"
#

DROP TABLE IF EXISTS `t_yct`;
CREATE TABLE `t_yct` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `money` decimal(10,2) DEFAULT NULL,
  `purpose` text CHARACTER SET utf8,
  `date` datetime DEFAULT '0000-00-00 00:00:00',
  `symbol` int(1) DEFAULT '0' COMMENT '0表示收入，1表示支出',
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Data for table "t_yct"
#

INSERT INTO `t_yct` VALUES (1,1.00,'小黄','2017-08-17 00:00:00',1,'zhang'),(2,2.00,'充值','2017-08-17 00:00:00',0,'zhang'),(3,5.00,'subway','2017-08-18 14:45:00',1,'zhang'),(4,100.00,'银行卡充值','2017-08-18 14:45:00',0,'zhang');
