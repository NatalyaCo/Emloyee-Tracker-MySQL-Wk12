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

const viewEmployee = async () => {
console.log('Employees');
try {
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        let employeeArray = [];
        res.forEach(employee => employeeArray.push(employee));
        console.table(employeeArray);
initialAction();
});
} catch (err) {
onsole.log(err);
initialAction();
};
}

const viewRoles = async () => {
console.log('Roles');
    
try {
let query = 'SELECT * FROM roles';
    connection.query(query, function (err, res) {
if (err) throw err;

//does it have to be roles? or role?
let roleArray = [];
    res.forEach(role => roleArray.push(role));
    console.table(roleArray);
initialAction();
});
} catch (err) {
    console.log(err);
initialAction();
};
}

const addEmployee = async () => {
try {
console.log('Adding Employee');

let roles = await connection.query("SELECT * FROM roles");
let managers = await connection.query("SELECT * FROM employee");
let answer = await inquirer.prompt([
    {
    name: 'firstName',
    type: 'input',
    message: 'Enter the first namee of employee, please'
    },
    {
    name: 'lastName',
    type: 'input',
    message: 'Enter the last name of employee, please'
    },
    {
    name: 'employeeRoleId',
    type: 'list',
    choices: roles.map((role) => {
    return {
    name: role.title,
    value: role.id
    }
        }),
    message: "Enter employee's role id, please"
    },
    {
    name: 'employeeManagerId',
    type: 'list',
    choices: managers.map((manager) => {
    return {
    name: manager.first_name + " " + manager.last_name,
    value: manager.id
    }
        }),
    message: "Enter employee's manager's id, please"
    }
        ])

    let result = await connection.query("INSERT INTO employee SET ?", {
    first_name: answer.firstName,
    last_name: answer.lastName,
    role_id: (answer.employeeRoleId),
    manager_id: (answer.employeeManagerId)
        });

console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        
initialAction();

} catch (err) {

    console.log(err);
        
initialAction();
};
}


