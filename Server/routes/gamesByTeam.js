const express = require('express');
const gameControllers = require('../controllers/game.controller.js')

const router = express.Router();

router.get('/', gameControllers.index);

router.get("/:teamID", gameControllers.showByTeamID)

router.get("/:homeID/:awayID", gameControllers.showBySeries)

module.exports = router; 