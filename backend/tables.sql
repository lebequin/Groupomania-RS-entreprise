CREATE TABLE IF NOT EXISTS `user` (
    id integer(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL UNIQUE,
    pseudo varchar(30) NOT NULL,
    avatarUrl varchar(255),
    password varchar(255),
    isAdmin BOOLEAN DEFAULT false
    -> ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `post` (
     id integer(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
     userId integer(11) NOT NULL,
     title varchar(30) NOT NULL,
     fileUrl varchar(255),
     likes integer(10),
     dislikes integer(10),
     FOREIGN KEY (userId) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO users SET email = `leo@test.fr` , pseudo = `leo`, avatarUrl =`img`, password =`1234`, isAdmin=false;