'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    gameID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    date: DataTypes.INTEGER,
    homeID: DataTypes.INTEGER,
    awayID: DataTypes.INTEGER,
    homeScore: DataTypes.INTEGER,
    awayScore: DataTypes.INTEGER,
    time: DataTypes.STRING,
    arena: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};