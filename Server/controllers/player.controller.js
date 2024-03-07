const models = require("../models");

function index(req, res) {
  models.Player.findAll()
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
  const player = {
    playerID: req.body.playerID,
    teamID: req.body.teamID,
    playerImage: req.body.playerImage,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jerseyNumber: req.body.jerseyNumber,
    position: req.body.position,
    height: req.body.height,
    weight: req.body.weight,
    handedness: req.body.handedness,
    class: req.body.class
  };
  models.Player.create(player)
    .then((result) => {
      res.status(200).json({
        message: "Player created successfully",
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
  const playerID = req.params.playerID;

  models.Player.findByPk(playerID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: `something went wrong`,
      });
    });
}

function showByTeamID(req, res) {
  const teamID = req.params.teamID;
  models.Player.findAll({
    where: {
      teamID: teamID,
    },
  })
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
  const playerID = req.params.playerID;
  updatedPlayer = {
    teamID: req.body.teamID,
    playerImage: req.body.playerImage,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jerseyNumber: req.body.jerseyNumber,
    position: req.body.position,
    height: req.body.height,
    weight: req.body.weight,
    handedness: req.body.handedness,
    class: req.body.class
  };

  models.Player.update(updatedPlayer, { where: { playerID: playerID } })
    .then((result) => {
      res.status(200).json({
        message: "Player updated successfully",
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
  const playerID = req.params.playerID;
  models.Player.destroy({ where: { playerID: playerID } })
    .then((result) => {
      res.status(200).json({
        message: "Player deleted successfully",
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

  showByTeamID: showByTeamID,
};
