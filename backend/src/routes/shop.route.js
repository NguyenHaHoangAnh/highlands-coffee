const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.post('/create', shopController.create);
router.put('/update/:id', shopController.update);
router.delete('/delete/:id', shopController.delete);
router.get('/available', shopController.getAvailableItem);
router.get('/:id', shopController.getItemById);
router.get('/', shopController.get);

module.exports = router