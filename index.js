const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

console.table("\n------------ EMPLOYEE TRACKER ------------\n")

inquirer.prompt([
{
    type: "list",
    message: "What would you like to do?",
    name: "mainMenu",
    choices: [
            "View list of departments",
            "View employee roles",
            "View list of employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Update employee's manager",
            "Remove a role from database",
            "Remove employee from database",
            "Exit"
        ]
},
])

//need to write function that modify the data


