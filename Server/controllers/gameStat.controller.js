const models = require("../models");

function index(req, res) {
  models.GameStat.findAll()
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
  const gameStat = {
    gameStatsID: req.body.gameStatsID,
    gameID: req.body.gameID,
    homeShots: req.body.homeShots,
    awayShots: req.body.awayShots,
    homeFaceoff: req.body.homeFaceoff,
    awayFaceoff: req.body.awayFaceoff,
    homePP: req.body.homePP,
    awayPP: req.body.awayPP,
    homePPG: req.body.homePPG,
    awayPPG: req.body.awayPPG,
    homeMinors: req.body.homeMinors,
    awayMinors: req.body.awayMinors,
    homeMajors: req.body.homeMajors,
    awayMajors: req.body.awayMajors,
    homeHits: req.body.homeHits,
    awayHits: req.body.awayHits,
    homeBlocks: req.body.homeBlocks,
    awayBlocks: req.body.awayBlocks,
    homeGiveaways: req.body.homeGiveaways,
    awayGiveaways: req.body.awayGiveaways
  };
  console.log(gameStat);
  models.GameStat.create(gameStat)
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
  const gameStatsID = req.params.gameStatsID;

  models.GameStat.findByPk(gameStatsID)
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
  models.GameStat.findAll({ where: { 
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

function update(req, res) {
  const gameStatsID = req.params.gameStatsID;
  updatedGameStats = {
    gameID: req.body.gameID,
    homeShots: req.body.homeShots,
    awayShots: req.body.awayShots,
    homeFaceoff: req.body.homeFaceoff,
    awayFaceoff: req.body.awayFaceoff,
    homePP: req.body.homePP,
    awayPP: req.body.awayPP,
    homePPG: req.body.homePPG,
    awayPPG: req.body.awayPPG,
    homeMinors: req.body.homeMinors,
    awayMinors: req.body.awayMinors,
    homeMajors: req.body.homeMajors,
    awayMajors: req.body.awayMajors,
    homeHits: req.body.homeHits,
    awayHits: req.body.awayHits,
    homeBlocks: req.body.homeBlocks,
    awayBlocks: req.body.awayBlocks,
    homeGiveaways: req.body.homeGiveaways,
    awayGiveaways: req.body.awayGiveaways
  };

  models.GameStat.update(updatedGameStats, { where: { gameStatsID: gameStatsID } })
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
  const gameStatsID = req.params.gameStatsID;
  models.GameStat.destroy({ where: { gameStatsID: gameStatsID } })
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
};
