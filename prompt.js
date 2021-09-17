const e = require('express')
const inquirer = require('inquirer')
const {
    viewAllDpts,
    addDpt,
    viewAllRoles,
    addRole,
    viewAllEmps,
    addEmp,
    updateEmp
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
            viewAllDpts()
        }
        else if (choice === 'View All Roles') {
            viewAllRoles()
        }
        else if(choice === 'View All Employees') {
            viewAllEmps()
        }
        else if(choice === 'Add a Department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'DptNameAdd',
                    message: 'What is the name of the Department you would like to add?'
                }
            ])
            .then(addDpt({ DptNameAdd }))
        }
    })
}

module.exports = prompt