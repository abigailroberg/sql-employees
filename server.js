const db = require('./db/connection')
const prompt = require('./prompt')
const cTable = require('console.table')

// connect to DB and start server
db.connect(err => {
    if(err) throw err
    console.log('Database connected')
    prompt()
})

// function to console log db query to view all departments
const viewAll = function() {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) throw err
        console.table(rows)
    })
}