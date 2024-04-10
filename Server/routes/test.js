const express = require('express');
const testControllers = require('../controllers/test.controller.js')

const router = express.Router();

router.post("/", testControllers.save);

router.get("/:id", testControllers.show);

router.get('/', testControllers.index);

router.patch('/:id', testControllers.update);

router.delete('/:id', testControllers.destroy);

module.exports = router;              