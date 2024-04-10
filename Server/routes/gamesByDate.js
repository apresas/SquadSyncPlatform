const express = require('express');
const gameControllers = require('../controllers/game.controller.js')

const router = express.Router();

router.get('/', gameControllers.index);

router.get("/:date", gameControllers.showByDate)

router.get("/:date/:teamID", gameControllers.showDateTeam)

module.exports = router; 