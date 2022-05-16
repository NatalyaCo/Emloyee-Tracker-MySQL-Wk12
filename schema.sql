DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
dept_Name VARCHAR(40) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (        
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT,
FOREIGN KEY(department_id),
PRIMARY KEY (id)
REFERENCES department(id),
ON DELETE SET NOT NULL 

);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
role_id INT,
FOREIGN KEY(role_id),
REFERENCES role(id),

manager_id INT,
FOREIGN KEY(manager_id),
REFERENCES employee(id),
ON DELETE SET NULL

);