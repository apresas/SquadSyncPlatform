const express = require('express');
const gameStatControllers = require('../controllers/gameStat.controller.js')

const router = express.Router();

router.post("/", gameStatControllers.save);

router.get("/:gameStatsID", gameStatControllers.show);

router.get('/', gameStatControllers.index);

router.patch('/:gameStatsID', gameStatControllers.update);

router.delete('/:gameStatsID', gameStatControllers.destroy);

module.exports = router;       