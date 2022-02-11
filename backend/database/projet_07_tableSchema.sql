DROP TABLE IF EXISTS commentaire;
DROP TABLE IF EXISTS publication;
DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
user_id INTEGER PRIMARY KEY NOT NULL auto_increment,
nom VARCHAR(25),
prenom VARCHAR(25),
pseudo VARCHAR(50),
email VARCHAR(50) NOT NULL UNIQUE,
user_password VARCHAR(250) NOT NULL, 
isAdmin TINYINT(0) NOT NULL 
);

CREATE TABLE publication (
post_id INTEGER PRIMARY KEY NOT NULL auto_increment,
user_id INTEGER NOT NULL,
content VARCHAR(500),
imageUrl VARCHAR(250),
FOREIGN KEY (user_id) REFERENCES utilisateur (user_id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE commentaire (
	comment_id INTEGER PRIMARY KEY NOT NULL auto_increment,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
	content VARCHAR(500),
    FOREIGN KEY(post_id) references publication (post_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES utilisateur (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);