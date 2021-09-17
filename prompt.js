const inquirer = require('inquirer')
const { viewAllDpts, addDpt, viewAllRoles, addRole, viewAllEmps, addEmp, updateEmp } = require('./manage')

// function to launch inquirer prompts 
const prompt = function() {
    console.log('prompt function running')
}

module.exports = prompt