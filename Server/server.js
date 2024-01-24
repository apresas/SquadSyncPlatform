import express from 'express';
import mysql from 'mysql2';

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tyler0710!',
    database: "squadsynctest"
})

app.get('/teams', (req, res) => {
    const q = "SELECT * FROM teams"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(5000, () => console.log('listening on port 5000'))