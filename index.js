require("dotenv").config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

const connection = mysql.createConnection({
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


const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                viewEmployee();
                break;

            case 'View Departments':
                viewDepartment();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'Add Employees':
                addEmployee();
                break

            case 'Add Departments':
                addDepartment();
                break

            case 'Add Roles':
                addRole();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        initialAction();
    };
}


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

const viewDepartment = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
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
        let answer = await inquirer.prompt([{
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

const addDepartment = async () => {
    try {
        console.log('Department Added successfully');

        let answer = await inquirer.prompt([{
            name: 'deptName',
            type: 'input',
            message: 'Enter department name'
        }]);

        let result = await connection.query("INSERT INTO department SET ?", 
        {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} added successfully to departments.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();

    };
}

const addRole = async () => {
    try {
    console.log('Add role');

        let departments = await connection.query("SELECT * FROM department")

        let answer = await inquirer.prompt([{
        name: 'title',
        type: 'input',
        message: 'Enter role title',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Ente salary for this role',
        },
        {
        name: 'departmentId',
        type: 'list',
        choices: departments.map((departmentId) => {
    return {
        name: departmentId.department_name,
        value: departmentId.id
        }
}),
     message: 'Enter department ID for this role',
        }
]);

let chooseDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chooseDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })

        console.log(`${answer.title} role added successfully.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}

const employeeUpdate = async () => {
    try {
    console.log('Updating Employee');
        
    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
        {
        name: 'employee',
        type: 'list',
        choices: employees.map((employeeName) => {
    return {
        name: employeeName.first_name + " " + employeeName.last_name,
        value: employeeName.id
            }
    }),
                message: 'Please choose employee to update'
            }
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
        {
        name: 'role',
        type: 'list',
        choices: roles.map((roleName) => {
    return {
            name: roleName.title,
            value: roleName.id
            }
    }),
        message: 'Enter employee new role'
            }
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

    console.log(`The role was successfully updated.\n`);

    initialAction();

} catch (err) {
    console.log(err);
    initialAction();
    };
}