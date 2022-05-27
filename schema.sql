DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT NOT NULL,
dept_Name VARCHAR(40) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (        
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);