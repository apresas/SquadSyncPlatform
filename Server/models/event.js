'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    eventID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    gameID: DataTypes.INTEGER,
    scoringTeam: DataTypes.INTEGER,
    goalID: DataTypes.INTEGER,
    primaryAssistID: DataTypes.INTEGER,
    secondaryAssistID: DataTypes.INTEGER,
    homeScore: DataTypes.INTEGER,
    awayScore: DataTypes.INTEGER,
    gameTime: DataTypes.STRING,
    period: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};