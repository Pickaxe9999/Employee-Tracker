const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');


//menus for interacting with the user
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

const promptForEmployee = async function(){
    //query the current information for all departments
    const rolesSql = `SELECT title, id FROM roles`;
    const roles = await db.promise().query(rolesSql).then(rows => {
        rows = rows[0];
        return rows;
    });

    //create a displayable table for inquirer for roles
    let displayRoles = [];
    for (let i = 0; i < roles.length; i++) {
        displayRoles.push(roles[i].title);
    }
    console.log(displayRoles);

    //query the current information for all managers
    const managerSQL = `SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL`;
    const managers = await db.promise().query(managerSQL).then(rows => {
        rows = rows[0];
        rows = rows.map(({first_name, last_name, id}) => ({
            name: first_name + ' ' + last_name,
            value: id
        }))
        rows.push({name: 'No Manager', value: null});
        return rows;
    });

    //create a displayable table for inquirer for managers
    let displayManagers = [];
    for (let i = 0; i < managers.length; i++) {
        displayManagers.push(managers[i].name);
    }


    //Ask for the new employees information
    const employee = await inquirer.prompt([
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
            message: 'What role does this employee have?',
            name: 'role_id',
            choices: displayRoles
        },
        {
            type: 'rawlist',
            message: 'What manager does this employee have?',
            name: 'manager_id',
            choices: displayManagers
        }
    ])

    //change the employee.manager_id to reflect the id of the manager and not the name
    managers.map(manager => {
        if(manager.name === employee.manager_id){
            employee.manager_id = manager.value;
        }
    })

    //change the employee.department_id to reflect the id of the department and not the name
    roles.map(role => {
        if(role.title === employee.role_id){
            employee.role_id = role.id;
        }
    })

    return employee;
}

const promptForRole = async function(){

    const departmentSql = `SELECT * FROM department`;
    const departments = await db.promise().query(departmentSql).then(rows => {
        rows = rows[0];
        return rows;
    });

    //create a displayable table for inquirer for roles
    let displayDepartments = [];
    for (let i = 0; i < departments.length; i++) {
        displayDepartments.push(departments[i].name);
    }


    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the name for this new title?",
            validate: name => {
                if (name){
                    return true;
                } else {
                    console.log("Please enter a name for the new role!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the gross salary for this new role?",
            validate: salary => {
                if (!isNaN(salary)){
                    if(parseInt(salary)/1000000 < 1){
                        return true;
                    }
                } else {
                    console.log("Please enter a number for this new role's salary!");
                    return false;
                }
            }
        },
        {
            type: 'rawlist',
            message: 'What department does this role belong to?',
            name: 'department_id',
            choices: displayDepartments
        }
    ])

    departments.map(departments => {
        if(departments.name === role.department_id){
            role.department_id = departments.id;
        }
    })

    role.salary = parseInt(role.salary);

    return role;
}

const promptForDepartment = async function(){

    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the name for this new department?",
            validate: name => {
                if (name){
                    return true;
                } else {
                    console.log("Please enter a name for the new role!");
                    return false;
                }
            }
        }
    ])

    return department;
}

const promptForEmployeeUpdate = async function(){
    const employeeSql = `SELECT * FROM employees`;
    const employees = await db.promise().query(employeeSql).then(rows => {
        rows = rows[0];
        rows = rows.map(employee => {
            const employeeData = {
                id: employee.id,
                name: employee.first_name + ' ' + employee.last_name
            }
            return employeeData;
        })
        return rows;
    });

    const rolesSql = `SELECT * FROM roles`;
    const roles = await db.promise().query(rolesSql).then(rows => {
        rows = rows[0];
        rows = rows.map(role => {
            const roleData = {
                id: role.id,
                title: role.title
            }
            return roleData;
        })
        return rows;
    })

    const employeeDisplay = employees.map(employee => {
        const name = employee.name;
        return name;
    })

    const roleDisplay = roles.map(role => {
        const roleName = role.title;
        return roleName;
    })


    let updatedEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: "Which employee would you like to update the role for?",
            choices: employeeDisplay
        },
        {
            type: 'list',
            name: 'role',
            message: "What role do you want to update them to?",
            choices: roleDisplay
        }
    ])

    employees.map(employee => {
        if(employee.name === updatedEmployee.name){
            updatedEmployee.name = employee.id
        }
    })

    roles.map(role => {
        if(role.title === updatedEmployee.role){
            updatedEmployee.role = role.id
        }
    })

    return updatedEmployee;
}



//employee queries & functions
const viewAllEmployees = function(){
    const sql = `SELECT * FROM employees`;
    db.promise().query(sql)
    .then(rows => {
        rows = rows[0];
        console.table(rows);
        return mainMenu();
    })
}

const addEmployee = async function(){
    sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const employee = await promptForEmployee();
    const params = [employee.first_name, employee.last_name, employee.role_id, employee.manager_id];

    db.promise().query(sql, params).then(() => {
        mainMenu();
    })
}

const updateEmployeeRole = async function(){
    const updatedEmployee = await promptForEmployeeUpdate();

    console.log(updatedEmployee);

    const updateSql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    await db.promise().query(updateSql,[updatedEmployee.role, updatedEmployee.name]).then(results => {
        console.log(results);
    })


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

const addRole = async function(){
    sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const role = await promptForRole();
    const params = [role.title, role.salary, role.department_id];

    db.promise().query(sql, params).then(() => {
        mainMenu();
    })
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

const addDepartment = async function(){
    sql = `INSERT INTO department (name) VALUES (?)`;
    const department = await promptForDepartment();
    const params = [department.name];

    db.promise().query(sql, params).then(() => {
        mainMenu();
    })
}

module.exports = {mainMenu}