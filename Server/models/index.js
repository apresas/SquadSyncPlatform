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
  }
});

// Test.sync({force: true}).then(() => {
//   console.log("Table and Model Synced Sucessfully")
// }).catch((err) => {
//   console.log("Error Syncing the Table and Model");
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
