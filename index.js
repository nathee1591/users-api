const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const app = express()

app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    console.log('Hello world')
    res.send('Hello world!!')
})

app.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
            console.log(results)
            res.send([])
        }
    )
})

app.listen(process.env.PORT || 3000)