const express = require('express');
require("dotenv").config();
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',

        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

connection.query = util.promisify(connection.query);

// Begin the application after establishing the connection.
connection.connect(function (err) {
    if (err) throw err;
    initialAction();
})

console.table("\n------------ EMPLOYEE TRACKER ------------\n")

function initialAction() {

    inquirer.prompt({

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

})

.then(function ({task}) {
switch (task) {

case "View Employees":
viewEmployee();
break;

case "View Employees by Department":
viewEmployeeByDepartment();
break;

case "Add Employee":
addEmployee();
break;

case "Remove Employees":
removeEmployees();
break;

case "Update Employee Role":
updateEmployeeRole();
break;

case "Add Role":
addRole();
break;

case "Exit":
connection.end();
break;
}
});
}

initialAction();

