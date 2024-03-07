const models = require("../models");

function index(req, res) {
  models.Event.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "somthing when wrong",
      });
    });
}

function save(req, res) {
  const event = {
    eventID: req.body.eventID,
    gameID: req.body.gameID,
    scoringTeam: req.body.scoringTeam,
    goalID: req.body.goalID,
    primaryAssistID: req.body.primaryAssistID,
    secondaryAssistID: req.body.secondaryAssistID,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    gameTime: req.body.gameTime,
    period: req.body.period,
    type: req.body.type
  };
  models.Event.create(event)
    .then((result) => {
      res.status(200).json({
        message: "Event created successfully",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        post: err,
      });
    });
}

function show(req, res) {
  const eventID = req.params.eventID;

  models.Event.findByPk(eventID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: `something went wrong`,
      });
    });
}

function showByGameID(req, res) {
  const gameID = req.params.gameID;
  models.Event.findAll({ where: { 
    gameID: gameID
   } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
      });
    });
}

function showByGoalID(req, res) {
    const goalID = req.params.goalID;
    models.Event.findAll({ where: { 
      goalID: goalID
     } })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          message: "something went wrong",
        });
      });
  }

function update(req, res) {
  const eventID = req.params.eventID;
  updatedEvent = {
    gameID: req.body.gameID,
    scoringTeam: req.body.scoringTeam,
    goalID: req.body.goalID,
    primaryAssistID: req.body.primaryAssistID,
    secondaryAssistID: req.body.secondaryAssistID,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    gameTime: req.body.gameTime,
    period: req.body.period,
    type: req.body.type
  };

  models.Event.update(updatedEvent, { where: { eventID: eventID } })
    .then((result) => {
      res.status(200).json({
        message: "Event updated successfully",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        post: err,
      });
    });
}

function destroy(req, res) {
  const eventID = req.params.eventID;
  models.Event.destroy({ where: { eventID: eventID } })
    .then((result) => {
      res.status(200).json({
        message: "Event deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something when wrong",
        error: err,
      });
    });
}

module.exports = {
  index: index,
  save: save,
  show: show,
  update: update,
  destroy: destroy,

  showByGameID:showByGameID,
  showByGoalID: showByGoalID
};
