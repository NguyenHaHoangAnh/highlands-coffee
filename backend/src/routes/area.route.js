const express = require('express');
const router = express.Router();

const areaController = require('../controllers/area.controller');

router.get('/:id', areaController.getItemById);
router.get('/', areaController.getAllItem);

module.exports = router