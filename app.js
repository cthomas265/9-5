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