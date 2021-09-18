const db = require('./db/connection')
const cTable = require('console.table')

// function to view all departments
const viewAllDpts = function() {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table('Departments:', rows)
    })
}

// function to add a department
const addDpt = function(name) {
    const sql = `INSERT INTO departments (name) VALUES (?)`
    const params = [name]

    db.query(sql, params, (err, result) => {
        if(err) throw err
        console.log(`${name} added to Departments!`)
    })
}

// function to view all roles
const viewAllRoles = function() {
    const sql = 
    `SELECT roles.title, 
        roles.id AS role_id,
        departments.name AS department,
        roles.salary
    FROM roles
    JOIN departments
    ON roles.department_id = departments.id`

    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table('Roles: ', rows)
    })
}

// function to add a role
const addRole = function(title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id) 
                VALUES (?, ?, ?)`
    const params = [title, salary, department_id]

    db.query(sql, params, (err, result) => {
        if(err) throw err
        console.log(`${title} added to Roles!`)
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
    LEFT JOIN employees m ON m.id = e.manager_id
    ORDER BY e.id`

    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table('Employees:', rows)
    })
}

// function to add an employee
const addEmp = function(first_name, last_name, role_id, manager_id) {
    const sql = 
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`
    const params = [first_name, last_name, role_id, manager_id]

    db.query(sql, params, (err, result) => {
        if(err) throw err
        console.log(`${first_name} ${last_name} added to Employees!`)
    })
}

// function to update an employee role
const updateEmp = function(employee_id, role_id) {
    const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?`
    const params = [role_id, employee_id]

    db.query(sql, params, (err, result) => {
        if (err) throw err
        console.log(`Employee Updated!`)
    })
}

// helper functions
    // function to get department id from department name
    const getDptId = function(dpt_name) {
        const sql = `SELECT id
                     FROM departments
                     WHERE name = ?`
        const params = [dpt_name]

        db.query(sql, params, (err, result) => {
            if (err) throw err
            console.log(result[0].id)
        })
    }

module.exports = {
    viewAllDpts,
    addDpt,
    viewAllRoles,
    addRole,
    viewAllEmps,
    addEmp,
    updateEmp,
    getDptId
}