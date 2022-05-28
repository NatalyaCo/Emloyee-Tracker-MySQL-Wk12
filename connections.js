viewDept = (displayDept) => {
console.log("Loading departments...\n");
connection.query("SELECT * FROM department", function (err, res) {
    if (err) {
    console.error(err);
    } else {
    console.table(res);
    }
    displayDept(err, res);
    });
};

viewRoles = (displayRoles) => {
console.log("Loading all roles...\n");
connection.query(`SELECT * FROM roles
    INNER JOIN 
    department ON role.department_id = department.id`, function (err, res) {
    if (err) {
    console.error(err)
    } else {
    console.table(res);
    }
    displayRoles(err, res);
    })
};

