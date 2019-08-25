CREATE DATABASE [IF NOT EXISTS] "database_name";

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `avatar` varchar(255) NOT NULL,
 `date_added` datetime NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 UNIQUE KEY `email` (`email`)
)

CREATE TABLE `profile` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `userid` int(11) NOT NULL,
 `handle` text NOT NULL,
 `company` text NOT NULL,
 `website` text NOT NULL,
 `location` varchar(200) NOT NULL,
 `status` varchar(200) NOT NULL,
 `bio` text NOT NULL,
 `skills` text NOT NULL,
 `github` varchar(200) NOT NULL,
 `youtube` varchar(100) NOT NULL,
 `facebook` varchar(100) NOT NULL,
 `linkedin` varchar(100) NOT NULL,
 `instagram` varchar(100) NOT NULL,
 `twitter` varchar(100) NOT NULL,
 `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `test` (`userid`),
 CONSTRAINT `test` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) 

CREATE TABLE `experience` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `userid` int(11) NOT NULL,
 `title` varchar(100) NOT NULL,
 `company` varchar(100) NOT NULL,
 `location` varchar(100) NOT NULL,
 `from_date` date NOT NULL,
 `to_date` date NOT NULL,
 `current` tinyint(3) NOT NULL,
 `description` text NOT NULL,
 PRIMARY KEY (`id`),
 KEY `experience_ibfk_1` (`userid`),
 CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) 

CREATE TABLE `education` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `userid` int(11) NOT NULL,
 `school` varchar(100) NOT NULL,
 `degree` varchar(100) NOT NULL,
 `fieldofstudy` text NOT NULL,
 `from_date` date NOT NULL,
 `to_date` date NOT NULL,
 `current` tinyint(3) NOT NULL,
 `description` text NOT NULL,
 PRIMARY KEY (`id`),
 KEY `education_ibfk_1` (`userid`),
 CONSTRAINT `education_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) 

CREATE TABLE `posts` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `userid` int(11) NOT NULL,
 `text` text NOT NULL,
 `name` varchar(100) NOT NULL,
 `avatar` varchar(200) NOT NULL,
 `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `userid` (`userid`),
 CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
)