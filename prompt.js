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
                'Update an Employee Role'
            ]
        }
    ])
    // perform desired function
    .then(({ choice }) => {
        if(choice === 'View All Departments') {
            return viewAllDpts()
        }
        else if (choice === 'View All Roles') {
            return viewAllRoles()
        }
        else if(choice === 'View All Employees') {
            return viewAllEmps()
        }
        else if(choice === 'Add a Department') {
             return inquirer.prompt([
                {
                    type: 'input',
                    name: 'dptName',
                    message: 'What is the name of the Department you would like to add?'
                }
            ]).then(function(answer) {
                addDpt(answer.dptName)
            })
        }
        else if(choice === 'Add a Role') {
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
        }
        else if(choice === 'Add an Employee') {
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
        }
    })
}

module.exports = prompt