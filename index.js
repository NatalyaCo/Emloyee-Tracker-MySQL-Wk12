const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
{
 host: 'localhost',

        // MySQL username,
user: 'root',
        // TODO: Add MySQL password here
password: 'Niko_Kotik5',
database: 'employee_db'
},
console.log(`Connected to the employee_db database.`)
);

console.table("\n------------ EMPLOYEE TRACKER ------------\n")

function initiate() {

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

.then (function ({task}) {
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

case "End":
connection.end();
break;
} 
})
}

//view empl
//view empl by dept
//dept choice
//add empl
//role choice
//remove employee

//update employee choice
//update role (has id, title, salary) value: id, title: `${title}`, salary: `${salary}
//add role
//DELETE FROM employee WHERE for bonus?