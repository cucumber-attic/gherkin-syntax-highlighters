# Table structure for table `authors`
#

-- just to test sql highlighting

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `idauthor` int(11) unsigned NOT NULL auto_increment,
  `surname` varchar(40) NOT NULL default '',
  `name` varchar(40) NOT NULL default '',
  PRIMARY KEY  (`idauthor`),
  key `surname` (`surname`)
) TYPE=InnoDB AUTO_INCREMENT=13 ;

/* a C like comment */