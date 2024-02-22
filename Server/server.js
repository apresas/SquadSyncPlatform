import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const port = 9200;
const app = express();
// app.use(cors())
app.use(express.json(), cors())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tyler0710!',
    database: "squadsynctest"
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
    // port: process.env.DB_PORT
})

app.get('/teams', (req, res) => {
    const q = "SELECT * FROM teams"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/teams/:teamID', (req, res) => {
    const teamID = req.params.teamID
    const q = "SELECT * FROM teams WHERE teamID = ?"
    db.query(q, [teamID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/schedule', (req, res) => {
    const q = "SELECT * FROM teamSchedule"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/schedule/:date', (req, res) => {
    const date = req.params.date
    const q = "SELECT * FROM schedule WHERE date = ? ORDER BY time, date ASC"
    db.query(q, [date], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/schedule/:date/:teamID/', (req, res) => {
    const date = req.params.date
    const homeID = req.params.teamID
    const awayID = req.params.teamID
    const q = "SELECT * FROM schedule WHERE date = ? AND (homeID = ? || awayID = ?) ORDER BY time, date ASC"
    db.query(q, [date, homeID, awayID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.get('/schedule/:gameID', (req, res) => {
    const gameID = req.params.gameID
    const q = 'SELECT * FROM schedule WHERE gameID = ?'
    db.query(q, [gameID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


// app.get('/schedule/:teamID/:teamID', (req, res) => {
//     const homeID = req.params.teamID
//     const awayID = req.params.teamID
//     const q = "SELECT * FROM schedule WHERE (homeID = ? || awayID = ?) AND (homeID = ? || awayID = ?)"
//     db.query(q, [homeID, awayID], (err, data) => {
//         if (err) return res.json(err)
//         return res.json(data)
//     })
// })


app.post('/schedule', (req, res) => {
    const q = "INSERT INTO schedule (`gameID`, `date`, `homeID`, `awayID`, `homeScore`, `awayScore`, `time`, `arena`) VALUES(?)"
    const values = [
        req.body.gameID,
        req.body.date,
        req.body.homeID,
        req.body.awayID,
        req.body.homeScore,
        req.body.awayScore,
        req.body.time,
        req.body.arena
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.put("/schedule/:gameID", (req, res) => {
    const gameID = req.params.gameID;
    const q = "UPDATE schedule SET `homeScore` = ?, `awayScore` = ? WHERE gameID = ?"
    const values = [
        req.body.home,
        req.body.away
    ]

    db.query(q, [...values, gameID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Score has been updated successfully")
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

app.get('/events', (req, res) => {
    const q = "SELECT * FROM game_events"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/events/:gameID', (req, res) => {
    const gameID = req.params.gameID
    const q = "SELECT * FROM game_events WHERE gameID = ? ORDER BY homeScore, awayScore ASC"
    db.query(q, [gameID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/events/:scorerID', (req, res) => {
    const scorerID = req.params.scorerID
    const q = "SELECT * FROM game_events WHERE scorerID = ?"
    db.query(q, [scorerID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/events', (req, res) => {
    const q = "INSERT INTO game_events (`eventID`, `gameID`, `scoreTeam`, `scorerID`, `primaryAssistID`, `secondaryAssistID`, `homeScore`, `awayScore`, `gameTime`, `period`, `type`) VALUES(?)"
    const values = [
        req.body.eventID,
        req.body.gameID,
        req.body.scoreTeam,
        req.body.scorerID,
        req.body.primaryAssistID,
        req.body.secondaryAssistID,
        req.body.homeScore,
        req.body.awayScore,
        req.body.gameTime,
        req.body.period,
        req.body.type
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// app.get('/players/:playerID', (req, res) => {
//     const playerID = req.params.playerID
//     const q = "SELECT * FROM players WHERE playerID = ?"
//     db.query(q, [playerID], (err, data) => {
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

app.get('/players/:teamID', (req, res) => {
    const teamID = req.params.teamID
    const q = "SELECT * FROM players WHERE teamID = ?"
    db.query(q, [teamID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/players/:homeID/:awayID', (req, res) => {
    const homeID = req.params.homeID
    const awayID = req.params.awayID
    const q = "SELECT * FROM players WHERE teamID = ? & teamID = ?"
    db.query(q, [parseInt(homeID), parseInt(awayID)], (err, data) => {
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