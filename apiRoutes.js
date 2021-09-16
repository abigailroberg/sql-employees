const express = require('express')
const router = express.Router()
const db = require('./db/connection')

// department routes
    // view all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`

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

module.exports = router