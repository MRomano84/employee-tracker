const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const mysql = require('mysql2');
const table = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //username
    user: 'root',
    //password
    password: 'root',
    database: 'company_db',
});

connection.connect((err) => {
    if(err) {
        console.log(err);
    }
    start();
    // console.log(`${connection.threadId} is connected on PORT# ${connection.port}`);
})

const viewEmps = () => {
    connection.query('SELECT first_name, last_name, role_id FROM employee;',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewDepts = () => {
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    function (err, res, fields) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const start = () => {
    console.log(
        chalk.cyan(
            figlet.textSync('EMPLOYEE TRACKER', { horizontalLayout: 'full', font: 'CYBERLARGE' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    inquirer.prompt({
        pageSize: 30,
        name: 'selection',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            new inquirer.Separator(),
            'Add Employee',
            'Add Department',
            'Add Role',
            new inquirer.Separator(),
            'Update Employee Role'
        ],
    })
    .then((answers) => {
        switch (answers.selection) {
            case 'View Employees':
                viewEmps();
                break;                
            case 'View Departments':
                viewDepts();
                break;
            case 'View Roles':
                viewRoles(); 
                break;
            case 'Add Employee':
                //FUNCTION TO ADD EMP
                break;
            case 'Add Department':
                //FUNCTION TO ADD DEPT 
                break;
            case 'Add Roles':
                //FUNCTION TO ADD ROLES 
                break;
            case 'Update Employee Role':
                //FUNCTION TO UPDATE EMP ROLE 
                break;
        }
    })
};
                            
