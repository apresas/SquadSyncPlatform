const express = require('express');
const gameControllers = require('../controllers/game.controller.js')

const router = express.Router();

router.post("/", gameControllers.save);

router.get("/:gameID", gameControllers.show);

router.get('/', gameControllers.index);

router.patch('/:gameID', gameControllers.update);

router.delete('/:gameID', gameControllers.destroy);

module.exports = router;              