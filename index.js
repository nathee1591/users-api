const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const app = express()

app.use(cors())
app.use(express.json())

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
            res.send(results)
        }
    )
})

app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO users (fname, lname, username, password, avatar) VALUES (?, ?, ?, ?, ?)', [req.body.fname,req.body.lname,req.body.username, req.body.password, req.body.avatar],
        function(err, results, fields) {
            if (err) throw err;
            console.log(results)
            console.log(err)
            res.send(results)
        }
    )
})

app.delete('/users', (req, res) => {
    connection.query(
        'DELETE FROM users WHERE id = ?', [req.body.id],
        function(err, results, fields) {
            if (err) throw err;
            console.log(results)
            res.send(results)
        }
    )
})

app.put('/update', (req, res) => {
    connection.query(
        'UPDATE users SET id = ?, fname = ?, lname = ?, username = ?, password = ?, avatar = ? WHERE id = ?', 
        [req.body.id, req.body.fname,
        req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
        function(err, results, fields) {
            if (err) throw err;
            console.log(results)
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000)
