const express = require('express');
const teamControllers = require('../controllers/team.controller.js')

const router = express.Router();

router.post("/", teamControllers.save);

router.get("/:teamID", teamControllers.show);

router.get('/', teamControllers.index);

router.patch('/:teamID', teamControllers.update);

router.delete('/:teamID', teamControllers.destroy);

module.exports = router;       