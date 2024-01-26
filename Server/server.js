import express from 'express';
import mysql from 'mysql2';

const port = 9200;
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

app.get('/standings', (req, res) => {
    const q = "SELECT standings.*, teams.schoolName, teams.logo, teams.division FROM standings INNER JOIN teams ON standings.teamID = teams.teamID"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/players', (req, res) => {
    const q = "SELECT players.*, teams.schoolName FROM players INNER JOIN teams ON players.teamID = teams.teamID"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen({port}, () => console.log(`listening on port ${port}`))