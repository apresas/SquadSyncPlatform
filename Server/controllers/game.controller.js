const models = require("../models");
const { Op } = require("sequelize");

function index(req, res) {
  models.Game.findAll({order:[['time', 'ASC']]})
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
  const game = {
    gameID: req.body.gameID,
    date: req.body.date,
    homeID: req.body.homeID,
    awayID: req.body.awayID,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    time: req.body.time,
    arena: req.body.arena,
  };
  console.log(game);
  models.Game.create(game)
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
  const gameID = req.params.gameID;

  models.Game.findByPk(gameID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: `something went wrong`,
      });
    });
}

function showByDate(req, res) {
  const date = req.params.date;

  models.Game.findAll({ where: { date: date }, order:[['time', 'ASC']] })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
      });
    });
}

function showDateTeam(req, res) {
  const date = req.params.date;
  const teamID = req.params.teamID;
  models.Game.findAll({
    where: {
      [Op.and]: [
        { date: date },
        { [Op.or]: [{ homeID: teamID }, { awayID: teamID }] },
      ],
    },
    order:[['time', 'ASC']]
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
      })
      console.log(err);
    });
}

function showByTeamID(req, res) {
  const teamID = req.params.teamID;
  models.Game.findAll({ where: { 
    [Op.or]: [
      {homeID: teamID},
      {awayID: teamID}
    ]
   }, order:[['date', 'ASC'],['time', 'ASC']]  })
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
  const gameID = req.params.gameID;
  updatedGame = {
    date: req.params.date,
    homeID: req.params.homeID,
    awayID: req.params.awayID,
    homeScore: req.params.homeScore,
    awayScore: req.params.awayScore,
    time: req.params.time,
    arena: req.params.arena,
  };

  models.Game.update(updatedGame, { where: { gameID: gameID } })
    .then((result) => {
      res.status(200).json({
        message: "Game updated successfully",
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
  const gameID = req.params.gameID;
  models.Game.destroy({ where: { gameID: gameID } })
    .then((result) => {
      res.status(200).json({
        message: "Game deleted successfully",
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

  showByDate: showByDate,
  showDateTeam: showDateTeam,
  showByTeamID:showByTeamID
};
