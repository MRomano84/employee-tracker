const inquirer = require('inquirer');
// const mysql = require('mysql');


// // create the connection information for the sql database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3301,
//     //username
//     user: 'root',
//     //password
//     password: 'root',
//     database: 'company_db',
// });

const start = () => {
    console.log('WELCOME TO THE EMPLOYEE TRACKER')
    inquirer.prompt({
        name: 'selection',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Employee',
            'View Department',
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
            case 'View Employee':
                //FUNCTION TO VIEW EMP
                break;                
            case 'View Department':
                //FUNCTION TO VIEW DEPT 
                break;
            case 'View Roles':
                //FUNCTION TO VIEW ROLES 
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

start();
