const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/export', fileController.exportDataToCSV);

module.exports = router;