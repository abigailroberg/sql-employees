const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()

// express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// default response for route not found
app.use((req, res) => {
    res.status(404).end()
})

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`)
})