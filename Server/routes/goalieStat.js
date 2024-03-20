const express = require('express');
const goalieStatControllers = require('../controllers/goalieStat.controller.js')

const router = express.Router();

router.post("/", goalieStatControllers.save);

router.get("/:goalieStatsID", goalieStatControllers.show);

router.get('/', goalieStatControllers.index);

router.patch('/:goalieStatsID', goalieStatControllers.update);

router.delete('/:goalieStatsID', goalieStatControllers.destroy);

module.exports = router;  