const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');


//main menu of the application
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

//user menu for adding a new employee
const promptForEmployee = async function(){
    //query the current information for all departments
    const departmentSQL = `SELECT name, id FROM department`;
    const departments = await db.promise().query(departmentSQL).then(rows => {
        rows = rows[0];
        return rows;
    });

    //query the current information for all managers
    const managerSQL = `SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL`;
    const managers = await db.promise().query(managerSQL).then(rows => {
        rows = rows[0];
        return rows;
    });


    //join the manager first and last names together into one string per index
    let displayManagers = [];
    for (let i = 0; i < managers.length; i++) {
        displayManagers.push(managers[i].first_name + ' ' + managers[i].last_name);
    }
    displayManagers.push('No Manager');


    console.log(managers);
    console.log(displayManagers);



    //Ask for the new employees information
    let employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: name => {
                if (name){
                    return true;
                } else {
                    console.log("Please enter the employee's first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: name => {
                if (name){
                    return true;
                } else {
                    console.log("Please enter the employee's last name!");
                    return false;
                }
            }
        },
        {
            type: 'rawlist',
            message: 'What department is this employee in?',
            name: 'department_id',
            choices: departments
        },
        {
            type: 'list',
            message: 'What manager does this employee have?',
            name: 'manager_id',
            choices: managers
        }
    ])

    console.log(employee);
}


//employee queries & functions
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
    sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    promptForEmployee();
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