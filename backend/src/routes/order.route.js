const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.post('/create', orderController.create);
router.post('/getById', orderController.getById);
router.get('/pending', orderController.getPendingOrder);
router.get('/success', orderController.getSuccessOrder);
router.get('/cancel', orderController.getCancelOrder);
router.put('/update/:id', orderController.update);

module.exports = router;