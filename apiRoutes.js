const express = require('express')
const router = express.Router()
const db = require('./db/connection')
const cTable = require('console.table')

// department routes
    // view all departments
const viewDpts = function() {
    console.log('prompt function running')
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table(rows)
    })
}
    

    // add a department
router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`
    const params = [body.name]

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

// role routes
    // view all roles
router.get('/roles', (req, res) => {
    const sql = 
    `SELECT roles.title, 
        roles.id AS role_id,
        departments.name AS department,
        roles.salary
    FROM roles
    JOIN departments
    ON roles.department_id = departments.id`

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message })
            return
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

    // add a role
router.post('/roles', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
    const params = [body.title, body.salary, body.department_id]
    
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

// employee routes
    // view all employees
router.get('/employees', (req, res) => {
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
        if(err) {
            res.status(500).json({ error: err.message })
            return
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

    // add an employee
router.post('/employees', ({ body }, res) => {
    const sql = 
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id]
    
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

    // update employee role
router.put('/employees/:id', (req, res) => {  
    const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?`
    const params = [req.body.role_id, req.params.id]

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message })
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        })
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        })
      }
    })
  })

const viewAll = function() {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table(rows)
    })
}

module.exports = {
    router,
    viewAll
}