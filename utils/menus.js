const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');



const mainMenu =  async function(){
    const { option } = await inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ]
    });
    if (option === 'View All Employees') {
        viewAllEmployees();
    } else if (option === 'Add Employee') {
        addEmployee();
    } else if (option === 'Update Employee Role') {
        updateEmployeeRole();
    } else if (option === 'View All Roles') {
        viewAllRoles();
    } else if (option === 'Add Role') {
        addRole();
    } else if (option === 'View All Departments') {
        viewAllDepartments();
    } else if (option === 'Add Department') {
        addDepartment();
    } else if (option === 'Quit') {
        return;
    }
}

//employee queries
const viewAllEmployees = function(){
    const sql = `SELECT * FROM employees`;
    db.promise().query(sql)
    .then(rows => {
        rows = rows[0];
        console.table(rows);
        mainMenu();
    })
}

const addEmployee = function(){
    console.log('add employee menu');
    return mainMenu();
}

const updateEmployeeRole = function(){
    console.log('update employee menu');
    return mainMenu();
}



//Role queries
const viewAllRoles = function(){
    const sql = `SELECT * FROM roles`;
    db.promise().query(sql)
    .then(rows => {
        rows = rows[0];
        console.table(rows);
        mainMenu();
    })
}

const addRole = function(){
    console.log('add role menu');
    return mainMenu();
}




//Department Queries
const viewAllDepartments = function(){
    const sql = `SELECT * FROM department`;
    db.promise().query(sql)
    .then(rows => {
        rows = rows[0];
        console.table(rows);
        mainMenu();
    })
}

const addDepartment = function(){
    console.log('add department menu');
    return mainMenu();
}

module.exports = {mainMenu}