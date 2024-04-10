const models = require("../models");

function index(req, res) {
  models.Team.findAll()
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
  const team = {
    teamID: req.body.teamID,
    schoolName: req.body.schoolName,
    mascotName: req.body.mascotName,
    city: req.body.city,
    division: req.body.division,
    logo: req.body.logo,
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    abbreviation: req.body.abbreviation
  };
  models.Team.create(team)
    .then((result) => {
      res.status(200).json({
        message: "Team created successfully",
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
  const teamID = req.params.teamID;
  console.log(teamID);

  models.Team.findByPk(teamID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: `something went wrong`,
      });
    });
}

function update(req, res) {
  const teamID = req.params.teamID;
  updatedTeam = {
    schoolName: req.body.schoolName,
    mascotName: req.body.mascotName,
    city: req.body.city,
    division: req.body.division,
    logo: req.body.logo,
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    abbreviation: req.body.abbreviation
  };

  models.Team.update(updatedTeam, { where: { teamID: teamID } })
    .then((result) => {
      res.status(200).json({
        message: "Team updated successfully",
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
  const teamID = req.params.teamID;
  models.Team.destroy({ where: { teamID: teamID } })
    .then((result) => {
      res.status(200).json({
        message: "Team deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something when wrong",
        error: err,
      });
    });
}

// function showByDate(req, res) {
//       const date = req.params.date;
    
//       models.Team.findAll({ where: { date: date } })
//         .then((result) => {
//           res.status(200).json(result);
//         })
//         .catch((err) => {
//           res.status(500).json({
//             message: "something went wrong",
//           });
//         });
//     }
    
//     function showDateTeam(req, res) {
//       const date = req.params.date;
//       const teamID = req.params.teamID;
//       models.Team.findAll({
//         where: {
//           [Op.and]: [
//             { date: date },
//             { [Op.or]: [{ homeID: teamID }, { awayID: teamID }] },
//           ],
//         },
//       })
//         .then((result) => {
//           res.status(200).json(result);
//         })
//         .catch((err) => {
//           res.status(500).json({
//             message: "something went wrong",
//           })
//           console.log(err);
//         });
//     }

module.exports = {
  index: index,
  save: save,
  show: show,
  update: update,
  destroy: destroy
};
