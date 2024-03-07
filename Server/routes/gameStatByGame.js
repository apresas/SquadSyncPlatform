const express = require('express');
const gameStatControllers = require('../controllers/gameStat.controller.js')

const router = express.Router();

router.get('/', gameStatControllers.index);

router.get("/:gameID", gameStatControllers.showByGameID)

module.exports = router; 