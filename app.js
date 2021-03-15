const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const mysql = require('mysql2');
const cTable = require('console.table');

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
    // console.log(`${connection.threadId} is connected on PORT# ${connection.port}`);
    //THE KICKOFF
    start();
})

//-----Functions to view all Employees, Departments, and Roles
const viewEmps = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('EMPLOYEES', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT first_name, last_name, title, salary FROM employee INNER JOIN role ON employee.role_id = role.id;',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewDepts = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('DEPARTMENTS', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT department.name FROM department',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    // connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    console.log(
        chalk.whiteBright(
            figlet.textSync('ROLES', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT role.title, role.salary FROM role',
    function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

//-----Functions to add Employees, Departments, and Roles
//-----ADD NEW EMPLOYEE-----
const addEmp = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('ADD EMPLOYEE', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
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

//-----ADD NEW DEPARTMENT-----
const addDept = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('ADD DEPARTMENT', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
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
            console.log(`${answers.name} Has Been Added As A Department.`);
            start();
        })
    })
}

//-----ADD NEW ROLE
const addRole = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('ADD ROLE', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT role.title AS Title, role.salary AS Salary FROM role',
    (err, res) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter The Title For The New Role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter The Salary For The New Role:'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Enter the Department ID For Which The New Role Belongs\n1-Finance 2-Legal 3-Logistics 4-Service 5-Marketing:',
                choices: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5'
                ]
            }
        ])
        .then((answers) => {
            connection.query('INSERT INTO role SET ?',
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department
            },
            function (err, res) {
                if (err) throw (err);
                start();
            })
        })
    })
}

//-----UPDATE CURRENT EMPLOYEE
const updateEmp = () => {
    console.log(
        chalk.whiteBright(
            figlet.textSync('UPDATE\nEMPLOYEE', { horizontalLayout: 'controlled smushing', font: 'slant' }) //CYBERLARGE MERLIN1 SHADOW SLANT
        )
    );
    connection.query('SELECT last_name FROM employee', (err, res) => {
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'last_name',
                message: 'Choose an Employee To Update:',
                choices: function () {
                    let names = [];
                    for(let i = 0; i < res.length; i++) {
                        names.push(res[i].last_name);
                    }
                    return names;
                }
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Enter The Employee\s New Role ID:'
            },
        ])
        .then((answers) => {
            // console.log(answers.role_id);
            // console.log(answers.last_name);
            connection.query(`UPDATE employee SET role_id = ${answers.role_id} WHERE employee.last_name = '${answers.last_name}'`, function(err, res) {
                if (err) throw (err);
                console.log(`Employee ${answers.last_name} Has Been Updated.`);
                // console.log(res);
                start();
            })
        })
    })
}

//-----FUNCTION THAT CONTROLS APP
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
            new inquirer.Separator(),
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
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmp(); 
            break;
        }
    })
};