const db = require('./db/connection')
const express = require('express')
const apiRoutes = require('./apiRoutes')

const PORT = process.env.PORT || 3001
const app = express()

// express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// use apiRoutes
app.use('/api', apiRoutes)

// default response for route not found
app.use((req, res) => {
    res.status(404).end()
})

// connect to DB and start server
db.connect(err => {
    if(err) throw err
    console.log('Database connected')
    app.listen(PORT, () => {
        console.log(`Now listening on port ${PORT}!`)
    })
})