const express = require('express');
const router = express.Router();

const coffeeController = require('../controllers/coffee.controller');

router.post('/create', coffeeController.create);
router.put('/update/:id', coffeeController.update);
router.delete('/delete/:id', coffeeController.delete);
router.get('/', coffeeController.get);

module.exports = router