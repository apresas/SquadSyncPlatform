"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const Test = sequelize.define("Test", {
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },

  userID: {
    type: Sequelize.DataTypes.INTEGER,
  },

  category: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

const Game = sequelize.define("Game", {
  gameID: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  date: { type: Sequelize.DataTypes.STRING },
  homeID: { type: Sequelize.DataTypes.INTEGER },
  awayID: { type: Sequelize.DataTypes.INTEGER },
  homeScore: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
  awayScore: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
  time: { type: Sequelize.DataTypes.STRING },
  arena: { type: Sequelize.DataTypes.STRING },
  final: { type: Sequelize.DataTypes.BOOLEAN, allowNull: true },
});

const Team = sequelize.define("Team", {
  teamID: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  schoolName: { type: Sequelize.DataTypes.STRING },
  mascotName: { type: Sequelize.DataTypes.STRING },
  city: { type: Sequelize.DataTypes.STRING },
  division: { type: Sequelize.DataTypes.STRING },
  logo: { type: Sequelize.DataTypes.STRING },
  primaryColor: { type: Sequelize.DataTypes.STRING },
  secondaryColor: { type: Sequelize.DataTypes.STRING },
  abbreviation: { type: Sequelize.DataTypes.STRING },
});

const Event = sequelize.define("Event", {
  eventID: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  gameID: { type: Sequelize.DataTypes.INTEGER },
  scoringTeam: { type: Sequelize.DataTypes.INTEGER },
  goalID: { type: Sequelize.DataTypes.INTEGER },
  primaryAssistID: { type: Sequelize.DataTypes.INTEGER },
  secondaryAssistID: { type: Sequelize.DataTypes.INTEGER },
  homeScore: { type: Sequelize.DataTypes.INTEGER },
  awayScore: { type: Sequelize.DataTypes.INTEGER },
  gameTime: { type: Sequelize.DataTypes.FLOAT },
  period: { type: Sequelize.DataTypes.STRING },
  type: { type: Sequelize.DataTypes.STRING },
});

const Player = sequelize.define("Player", {
  playerID: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  teamID: { type: Sequelize.DataTypes.INTEGER },
  playerImage: { type: Sequelize.DataTypes.STRING, allNulls: true },
  firstName: { type: Sequelize.DataTypes.STRING },
  lastName: { type: Sequelize.DataTypes.STRING },
  jerseyNumber: { type: Sequelize.DataTypes.INTEGER },
  position: { type: Sequelize.DataTypes.STRING },
  height: { type: Sequelize.DataTypes.INTEGER },
  weight: { type: Sequelize.DataTypes.INTEGER },
  handedness: { type: Sequelize.DataTypes.STRING },
  class: { type: Sequelize.DataTypes.STRING },
});

const GameStats = sequelize.define("GameStats", {
  gameStatsID: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  gameID: { type: Sequelize.DataTypes.INTEGER },
  homeShots: { type: Sequelize.DataTypes.INTEGER },
  awayShots: { type: Sequelize.DataTypes.INTEGER },
  homeFaceoff: { type: Sequelize.DataTypes.INTEGER },
  awayFaceoff: { type: Sequelize.DataTypes.INTEGER },
  homePP: { type: Sequelize.DataTypes.INTEGER },
  awayPP: { type: Sequelize.DataTypes.INTEGER },
  homePPG: { type: Sequelize.DataTypes.INTEGER },
  awayPPG: { type: Sequelize.DataTypes.INTEGER },
  homeMinors: { type: Sequelize.DataTypes.INTEGER },
  awayMinors: { type: Sequelize.DataTypes.INTEGER },
  homeMajors: { type: Sequelize.DataTypes.INTEGER },
  awayMajors: { type: Sequelize.DataTypes.INTEGER },
  homeHits: { type: Sequelize.DataTypes.INTEGER },
  awayHits: { type: Sequelize.DataTypes.INTEGER },
  homeBlocks: { type: Sequelize.DataTypes.INTEGER },
  awayBlocks: { type: Sequelize.DataTypes.INTEGER },
  homeGiveaways: { type: Sequelize.DataTypes.INTEGER },
  awayGiveaways: { type: Sequelize.DataTypes.INTEGER },
});

// GameStats.sync({force: true})
//   .then(() => {
//     console.log("Table and Model synced Successfully");
//   })
//   .catch(() => {
//     console.log("Error Syncing Table and Model");
//   });

// Player.sync()
// .then(() => {
//   console.log("Table and Model synced Successfully");
// }).catch(() => {
//   console.log("Error Syncing Table and Model")
// })

// Event.sync({force: true})
//   .then(() => {
//     console.log("Table and Model Synced Successfully");
//   })
//   .catch(() => {
//     console.log("Error Syncing the Table and Model");
//   });

// Team.sync({force:true}).then(() => {
//   console.log('Table and Model Synced Successfully')
// }).catch(() => {
//   console.log('Error Syncing the Table and Model')
// })

// Game.sync({force:true}).then(() => {
//   console.log("Table and Model Synced Sucessfully")
// }).catch(err => {
//   console.log("Error Syncing the Table and Model");
// })

// Test.sync({force: true}).then(() => {
//   console.log("Table and Model Synced Sucessfully")
// }).catch((err) => {
//   console.log("Error Syncing the Table and Model");
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
