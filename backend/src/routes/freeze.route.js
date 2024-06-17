const express = require('express');
const router = express.Router();

const freezeController = require('../controllers/freeze.controller');

router.post('/create', freezeController.create);
router.put('/update/:id', freezeController.update);
router.delete('/delete/:id', freezeController.delete);
router.get('/', freezeController.get);
router.get('/page-count', freezeController.getPageCount);

module.exports = router