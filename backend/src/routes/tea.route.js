const express = require('express');
const router = express.Router();

const teaController = require('../controllers/tea.controller');

router.post('/create', teaController.create);
router.put('/update/:id', teaController.update);
router.delete('/delete/:id', teaController.delete);
router.get('/', teaController.get);
router.get('/page-count', teaController.getPageCount);

module.exports = router