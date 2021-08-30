const express = require('express');
const sortingValidationMiddleware = require('../lib/sortingValidationMiddleware');
const yearAmountValidationMiddleware = require('../lib/yearAmountValidationMiddleware');
const Controller = require('../controller/index');

const router = express.Router();

router.get('/', sortingValidationMiddleware, yearAmountValidationMiddleware, Controller.find);

module.exports = router;