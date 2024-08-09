const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/area-manager', userController.getAllAreaManager);
router.get('/:id', userController.getUserById);

module.exports = router