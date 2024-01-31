import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const port = 9200;
const app = express();
// app.use(cors())
app.use(express.json(), cors())
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

app.post('/players', (req, res) => {
    const q = "INSERT INTO players (`playerID`, `teamID`, `playerImage`, `firstName`, `lastName`, `jerseyNumber`, `position`, `height`, `weight`, `handedness`, `class`) VALUES(?)"
    const values = [
        req.body.playerID,
        req.body.teamID,
        req.body.playerImage,
        req.body.firstName,
        req.body.lastName,
        req.body.jerseyNumber,
        req.body.position,
        req.body.height,
        req.body.weight,
        req.body.handedness,
        req.body.class
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/players/:id", (req, res) => {
    const playerID = req.params.id;
    const q = "DELETE FROM players WHERE playerID = ?"
    db.query(q, [playerID], (err, data) => {
        if (err) return res.json(err)
        return res.json("Player has been deleted successfully")
    });
})

app.put("/players/:playerID", (req, res) => {
    const playerID = req.params.playerID;
    const q = "UPDATE players SET `teamID` = ?, `firstName` = ?, `lastName` = ?, `jerseyNumber` = ?, `position`= ?, `height` = ?, `weight` = ?, `handedness` = ?, `class` = ? WHERE playerID = ?"
    const values = [
        req.body.teamID,
        req.body.firstName,
        req.body.lastName,
        req.body.jerseyNumber,
        req.body.position,
        req.body.height,
        req.body.weight,
        req.body.handedness,
        req.body.class
        
    ]

    db.query(q, [...values, playerID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Player has been updated successfully")
    })
})

app.listen({port}, () => console.log(`listening on port ${port}`))