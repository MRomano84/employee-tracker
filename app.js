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

//-----Functions to view all Employees, Departments, and Roles
const viewEmps = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('EMPLOYEES', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT first_name, last_name, role_id Department FROM employee JOIN role ON employee.role_id = role.department_id',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewDepts = () => {
    connection.query('SELECT department.name FROM department',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

//-----Functions to add Employees, Departments, and Roles
const addEmp = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('ADD\nEMPLOYEE', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter First Name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter Last Name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the Role ID:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the Manager\'s ID:'
        },
    ])
    .then((answers) => {
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id,
        },
        function(err, res) {
            if (err) throw (err);
            console.table(res.answers);
            start();
        })
    })
}

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter The Name of The New Department'
        }
    ])
    .then((answers) => {
        connection.query('INSERT INTO department SET ?',
        {
            name: answers.name
        },
        function(err, res) {
            if (err) throw (err);
            console.table(department);
            start();
        })
    })
}

const addRole = () => {
    
}

const start = () => {
    console.log(
        chalk.cyan(
            figlet.textSync('EMPLOYEE\nTRACKER', { horizontalLayout: 'full', font: 'CYBERLARGE' }) //CYBERLARGE MERLIN1 SHADOW SLANT
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
                addEmp();
                break;
            case 'Add Department':
                addDept();
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
                            
