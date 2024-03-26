const models = require("../models");

function index(req, res) {
  models.GoalieStat.findAll()
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
  const goalieStat = {
    goalieStatsID: req.body.goalieStatsID,
    gameID: req.body.gameID,
    playerID: req.body.playerID,
    teamID: req.body.teamID,
    shotsAgainst: req.body.shotsAgainst,
    goalsAgainst: req.body.goalsAgainst,
    saves: req.body.saves,
    toi: req.body.TOI,
  };
  console.log(goalieStat);
  models.GoalieStat.create(goalieStat)
    .then((result) => {
      res.status(200).json({
        message: "Test created successfully",
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
  const goalieStatsID = req.params.gameStatsID;

  models.GoalieStat.findByPk(goalieStatsID)
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
  models.GoalieStat.findAll({ where: { 
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

function showByPlayerID(req, res) {
  const playerID = req.params.playerID;
  models.GoalieStat.findAll({ where: { 
    playerID: playerID
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
  const goalieStatsID = req.params.gameStatsID;
  updatedGoalieStats = {
    gameID: req.body.gameID,
    playerID: req.body.playerID,
    shotsAgainst: req.body.shotsAgainst,
    goalsAgainst: req.body.goalsAgainst,
    saves: req.body.saves,
    toi: req.body.TOI,
  };

  models.GoalieStat.update(updatedGoalieStats, { where: { goalieStatsID: goalieStatsID } })
    .then((result) => {
      res.status(200).json({
        message: "GameStat updated successfully",
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
  const goalieStatsID = req.params.goalieStatsID;
  models.GoalieStat.destroy({ where: { goalieStatsID: goalieStatsID } })
    .then((result) => {
      res.status(200).json({
        message: "GameStat deleted successfully",
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

  showByGameID: showByGameID,
  showByPlayerID: showByPlayerID
};
