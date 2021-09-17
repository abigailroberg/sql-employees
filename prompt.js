const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')

// function to launch inquirer prompts 
const prompt = function() {
    console.log('prompt function running')
    viewAllEmps()
}

// function to view all departments
const viewAllDpts = function() {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table('Departments:', rows)
    })
}

// function to view all employees
const viewAllEmps = function() {
    const sql = 
    `SELECT e.id, 
        e.first_name, 
        e.last_name, 
        roles.title AS role_title, 
        departments.name AS department, 
        roles.salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    JOIN roles ON e.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees m ON m.id = e.manager_id`

    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table('Employees:', rows)
    })
}

module.exports = prompt