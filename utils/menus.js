const inquirer = require('inquirer');

const mainMenu =  function(){
    return inquirer.prompt({
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
    }).then(({option}) => {
        if(option === 'View All Employees'){
            viewAllEmployees();
        }else if(option === 'Add Employee'){
            addEmployee();
        }else if(option === 'Update Employee Role'){
            updateEmployeeRole();
        }else if(option === 'View All Roles'){
            viewAllRoles();
        }else if(option === 'Add Role'){
            addRole();
        }else if(option === 'View All Departments'){
            viewAllDepartments();
        }else  if(option === 'Add Department'){
            addDepartment();
        }else  if(option === 'Quit'){
            return;
        } 
    })
}

const viewAllEmployees = function(){
    console.log('all employee view menu');
    return mainMenu();
}

const addEmployee = function(){
    console.log('add employee menu');
    return mainMenu();
}

const updateEmployeeRole = function(){
    console.log('update employee menu');
    return mainMenu();
}

const viewAllRoles = function(){
    console.log('all Roles view menu');
    return mainMenu();
}

const addRole = function(){
    console.log('add role menu');
    return mainMenu();
}

const viewAllDepartments = function(){
    console.log('view all departments menu');
    return mainMenu();
}

const addDepartment = function(){
    console.log('add department menu');
    return mainMenu();
}

module.exports = {mainMenu}