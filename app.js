const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./connection.js');

//create connection n throw error if error
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    work();
})

const work = () => {
    inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "What?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "Update employee role",
                "Exit"
            ]
        }])
        .then(function (answer) {
            switch (answer.choice) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a new department":
                    addDepartment();
                    break;
                case "Add a new role":
                    addRole();
                    break;
                case "Add a new employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};


const viewAllDepartments = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        work();
    })
}

const addDepartment = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is the new department?"
            },

        ]).then (function (answer) {
            connection.query('INSERT INTO department SET ?', {
                department: answer.name,
            }, function (err) {
                if (err) throw err;
                console.log("Department added!");
                work()
            })
        })
    })
}

const addRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary?"
            },
            {
                name: "dept_id",
                type: "input",
                message: "Input department Id number."
            }
        ]).then (function (answer) {
            connection.query('INSERT INTO roles SET ?', {
                title: answer.title,
                salary: answer.salary,
                dept_id: answer.dept_id
            }, function (err) {
                if (err) throw err;
                console.log("Role added!");
                work()
            })
        })
    })
}
//update employee role - query map to employee first name, THEN in .then query role table, then map role titles, .then from first name to role title update role table where first name === prompt first name. like role_id and .then function
// const updateEmployeeRole = () => {
//     connection.query('SELECT * FROM roles', (err, res) => {
//         if (err) throw err;

//         inquirer.prompt([
//             {
//                 name: "firstName",
//                 type: "input",
//                 message: "What is the employee's first name?",
//                 answer: "first_name"
//             },
//             {
//                 name: "role_id",
//                 type: "list",
//                 message: "What is the employee's new role?",
//                 choices: res.map(role => role.title)
//             }
//         ]).then(function (answer) {
//             const roleId = res.find(name => role.title === answer.role_id).id;

//             connection.query('UPDATE employee ? WHERE ?',{
//                     first_name: answer.firstName,
//                     role_id: roleId
//             },function (err) {
//                 if (err) throw err;
//                 console.log("Employee role updated!");
//                 work();
//             })
//         })
//     })
// }


const addEmployee = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },

            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
         //make connection to roles table and get id
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's role?",
                choices: res.map(role => role.title)
            }
        ]).then(function (answer) {

            const roleId = res.find(role => role.title === answer.role_id).id;

            connection.query('INSERT INTO employees SET ?', {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: roleId
            }, function (err) {
                if (err) throw err;
                console.log("Employee added!");
                work();
            })
        })
    })
}