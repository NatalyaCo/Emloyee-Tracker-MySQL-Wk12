const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

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
        password: 'Niko_Kotik5',
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
})
}


const employeeView = async () => {
console.log('Employee View');
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
console.log(err);
initialAction();
};
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

const employeeAdd = async () => {
try {
console.log('Employee Add');

let roles = await connection.query("SELECT * FROM role");

let managers = await connection.query("SELECT * FROM employee");

let answer = await inquirer.prompt([{
name: 'firstName',
type: 'input',
message: 'What is the first name of this Employee?'
},

{
name: 'lastName',
type: 'input',
message: 'What is the last name of this Employee?'
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
                
message: "What is this Employee's role id?"
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
message: "What is this Employee's Manager's Id?"
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