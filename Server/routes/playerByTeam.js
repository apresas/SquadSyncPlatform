const express = require('express');
const playerControllers = require('../controllers/player.controller.js')

const router = express.Router();

router.get("/:teamID", playerControllers.showByTeamID);

router.get('/', playerControllers.index);

module.exports = router;   