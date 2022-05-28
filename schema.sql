DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
id INT NOT NULL,
dept_Name VARCHAR(40) NOT NULL,
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (        
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT NULL,
-- FORGEIN KEY (department_id),
-- REFERENCES (department_id),
-- ON DELETE CASCASDE
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
-- FORGEIN KEY (roles_id),
-- REFERENCES employee_roles(id),
-- ON DELETE CASCASDE,
-- FORGEIN KEY (manager_id),
-- REFERENCES employee(id),
-- ON DELETE CASCASDE
);