'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoalieStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GoalieStat.init({
    goalieStatsID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      gameID: DataTypes.INTEGER,
      playerID: DataTypes.INTEGER,
      teamID: DataTypes.INTEGER,
      shotsAgainst: DataTypes.INTEGER,
      goalsAgainst: DataTypes.INTEGER,
      saves: DataTypes.INTEGER,
      toi: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'GoalieStat',
  });
  return GoalieStat;
};