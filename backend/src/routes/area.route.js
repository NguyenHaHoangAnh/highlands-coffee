const express = require('express');
const router = express.Router();

const areaController = require('../controllers/area.controller');

router.post('/create', areaController.create);
router.put('/update/:id', areaController.update);
router.delete('/delete/:id', areaController.delete);
router.get('/available', areaController.getAvailableItem);
router.get('/:id', areaController.getItemById);
router.get('/', areaController.getAllItem);

module.exports = router