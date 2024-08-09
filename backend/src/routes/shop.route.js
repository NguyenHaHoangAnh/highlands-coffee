const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.get('/:id', shopController.getItemById);
router.get('/', shopController.getAllItem);

module.exports = router