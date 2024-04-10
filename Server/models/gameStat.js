'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameStat.init({
    gameStatsID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      gameID: DataTypes.INTEGER,
      homeShots: DataTypes.INTEGER,
      awayShots: DataTypes.INTEGER,
      homeFaceoff: DataTypes.INTEGER,
      awayFaceoff: DataTypes.INTEGER,
      homePP: DataTypes.INTEGER,
      awayPP: DataTypes.INTEGER,
      homePPG: DataTypes.INTEGER,
      awayPPG: DataTypes.INTEGER,
      homeMinors: DataTypes.INTEGER,
      awayMinors: DataTypes.INTEGER,
      homeMajors: DataTypes.INTEGER,
      awayMajors: DataTypes.INTEGER,
      homeHits: DataTypes.INTEGER,
      awayHits: DataTypes.INTEGER,
      homeBlocks: DataTypes.INTEGER,
      awayBlocks: DataTypes.INTEGER,
      homeGiveaways: DataTypes.INTEGER,
      awayGiveaways: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameStat',
  });
  return GameStat;
};