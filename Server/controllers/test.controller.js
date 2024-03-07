const models = require("../models");

function index(req, res) {
  models.Test.findAll()
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
  const test = {
    title: req.body.title,
    userID: req.body.userID,
    category: req.body.category,
  };
  models.Test.create(test)
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
  const id = req.params.id;

  models.Test.findByPk(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
      });
    });
}


function showByUser(req, res) {
  const userID = req.params.userID;

  models.Test
  .findAll({ where: {userID: userID} })
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
  const id = req.params.id;
  updatedTest = {
    title: req.body.title,
  };

  models.Test.update(updatedTest, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Test updated successfully",
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
  const id = req.params.id;
  models.Test.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Test deleted successfully",
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

  showByUser: showByUser
};
