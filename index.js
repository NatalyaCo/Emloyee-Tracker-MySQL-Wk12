const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
        port: "3001",
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

console.table("\n------------ EMPLOYEE TRACKER ------------\n")

const askQuestion = async function () {
    const answer = await inquirer.prompt([{
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
        ],
        name: "choice"
    }])

    switch (answer.choice) {
        case "View list of departments": {
        
            const departments = await viewDepartments();
            console.table(departments);
            askQuestion();
            break;
        }
        case "View employee roles": {
        
            const roles = await viewRoles();
            console.table(roles);
            askQuestion();
            break;
        }
        case "View list of employees": {
        
            const employees = await viewEmployees();
            console.table(employees);
            askQuestion();
            break;
        }
        case "Add a department": {
        
            await askDepartment();
            askQuestion();
            break;
        }
        case "Add a role": {
        
            await askRole();
            askQuestion();
            break;
        }
        case "Add an employee": {
        
            await askEmployee();
            askQuestion();
            break;
        }
        case "Update an employee role": {
         (bonus)
            await updateRole();
            askQuestion();
            break;
        }
        case "Update an employee's manager": {
            await updateManager();
            askQuestion();
            break;
        }
        case "View employees by department": {
            const employees = await viewByDepartment();
            console.table(employees);
            askQuestion();
            break;
        }
        default: {
            connection.end();
            process.exit();
        }
    }

}
askQuestion();

