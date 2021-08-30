const express = require('express');
const Controller = require('../controller/index')
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create-from-csv', upload.single('file'), Controller.createCSV)

module.exports = router;