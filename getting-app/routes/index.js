const express = require('express');
const Controller = require('../controller/index');

const router = express.Router();

router.get('/', Controller.find);

module.exports = router;