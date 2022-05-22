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
                "Delete Department",
                "Delete Role",
                "Delete Employee",
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
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Delete Employee":
                    deleteEmployee();
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
                name: "department",
                type: "input",
                message: "What is the new department?"
            },

        ]).then (function (answer) {
            connection.query('INSERT INTO departments SET ?', {
                name: answer.department
            }, function (err) {
                if (err) throw err;
                console.log("Department added!");
                work();
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

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
                answer: res.map(employee => employee.first_name)
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employee's new role?",
                choices: res.map(role => role.title)
            }
        ]).then(function (answer) {
            const roleId = res.find(role => role.title === answer.role_id).id;

            connection.query('UPDATE employees SET ? WHERE ?', [{
                    role_id: roleId
                },
                {
                    first_name: answer.firstName
                }
            ], function (err) {
                if (err) throw err;
                console.log("Role updated!");
                work();
            })
        })
    })
}

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

const deleteDepartment = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to delete?",
                answer: res.map(department => department.name)
            }
        ]).then(function (answer) {
            connection.query('DELETE FROM departments WHERE ?', {
                name: answer.department
            }, function (err) {
                if (err) throw err;
                console.log("Department successfully deleted!");
                work();
            })
        })
    })
}

const deleteRole = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {name: 'roles',
            type: 'input',
            message: 'What role would you like to delete?',
            answer: res.map(roles => roles.title)
            }
        ]).then(function(answer) {
            connection.query('DELETE FROM roles WHERE ?', {
                title: answer.roles
            }, function(err) {
                if (err) throw err;
                console.log("Role successfully deleted!");
                work();
            })
        })
    })
}

const deleteEmployee = () => {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
                answer: res.map(employee => employee.first_name)
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
                answer: res.map(employee => employee.last_name)
            }
        ]).then(function (answer) {
            connection.query('DELETE FROM employees WHERE ?', {
                first_name: answer.first_name
            }, function (err) {
                if (err) throw err;
                console.log("Employee succesfully deleted!");
                work();
            })
        })
    })
}
