const db = require('./db/connection')
const prompt = require('./prompt')
const cTable = require('console.table')

// connect to DB and start server
db.connect(err => {
    if(err) throw err
    console.log('Database connected')
    prompt()
})