const e = require('express')
const inquirer = require('inquirer')
const {
    viewAllDpts,
    addDpt,
    viewAllRoles,
    addRole,
    viewAllEmps,
    addEmp,
    updateEmp,
    getDptId,
    getDpts,
    getRoleId,
    getRoles,
    getEmpId,
    getEmpNames
} = require('./manage')

// function to launch inquirer prompts 
const prompt = function() {
    console.log('prompt function running')
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add a Department',
                'View All Roles',
                'Add a Role',
                'View All Employees',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ]
        }
    ])
    // perform desired function
    .then(({ choice }) => {
        if(choice === 'View All Departments') {
            viewAllDpts()
            // show menu again
            prompt()
        }
        else if (choice === 'View All Roles') {
            viewAllRoles()
            // show menu again
            prompt()
        }
        else if(choice === 'View All Employees') {
            viewAllEmps()
            // show menu again
            prompt()
        }
        else if(choice === 'Add a Department') {
            // prompt for department name to add
             return inquirer.prompt([
                {
                    type: 'input',
                    name: 'dptName',
                    message: 'What is the name of the Department you would like to add?'
                }
            ]).then(function(answer) {
                addDpt(answer.dptName)
            })
            // show menu again
            .then(prompt())
        }
        else if(choice === 'Add a Role') {
            // prompt for role info needed to add
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the title of the Role you would like to add?'
                },
                {
                    type: 'number',
                    name: 'roleSalary',
                    message: 'What is the salary for this role?'
                },
                {
                    type: 'input',
                    name: 'dptName',
                    message: 'Which department would you like to add this Role to?'
                }
            ]).then(function(answer) {
                const roleName = answer.roleName
                const roleSalary = answer.roleSalary
                const departmentId = getDptId('Finance')
                console.log(departmentId)
                addRole(roleName, roleSalary, 5)
            })
            // show menu again
            .then(prompt())
        }
        else if(choice === 'Add an Employee') {
            // prompt for info needed to add an employee
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee you would like to add?'
                }
            ])
            .then(function(answer) {
                const firstName = answer.firstName
                const lastName = answer.lastName
                addEmp(firstName, lastName, 4, 2)
            })
            // show menu again
            .then(prompt())
        }
        else if(choice === 'Update an Employee Role') {
            // prompt for info needed to update employee role
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee would you like to update?',
                    choices: ['John Smith', 'Jane Brown']
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What role would you like to assign?',
                    choices: ['Finance Employee', 'Finance Manager']
                }
            ])
            .then(function(answer) {
                const employeeId = getEmpId(answer.employeeId)
                const roleId = getRoleId(answer.roleId)
                updateEmp(1, 4)
            })
            // show menu again
            .then(prompt())
        }
        else if(choice === 'Quit') {
            return
        }
    })
}

module.exports = prompt