const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/', dataController.createData); 
router.get('/', dataController.fetchData);
router.delete('/:id', dataController.deleteDataHandler);
router.patch('/:id', dataController.patchData);

router.get('/paginated', dataController.fetchPaginatedData);

module.exports = router;