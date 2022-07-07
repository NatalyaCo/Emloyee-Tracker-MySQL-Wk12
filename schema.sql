DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_Name VARCHAR(40) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(10,2) NULL,
department_id INT NULL,
PRIMARY KEY (id)
);


DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INT,
manager_id INT,
FOREIGN KEY (roles_id) REFERENCES roles(id)
ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employee(id)
ON DELETE CASCADE
);

