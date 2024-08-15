const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/area-manager', userController.getAllAreaManager);
router.get('/shop-manager', userController.getAllShopManager);
router.get('/staff', userController.getAllStaff);
router.post('/create', userController.create);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);
router.get('/:id', userController.getUserById);

module.exports = router