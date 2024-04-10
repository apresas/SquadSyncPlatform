const express = require('express');
const playerControllers = require('../controllers/player.controller.js')

const router = express.Router();

router.post("/", playerControllers.save);

router.get("/:playerID", playerControllers.show);

router.get('/', playerControllers.index);

router.patch('/:playerID', playerControllers.update);

router.delete('/:playerID', playerControllers.destroy);

module.exports = router;   