const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', userController.create);
router.get('/:id', userController.read);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/deactivate', userController.deactivate);

module.exports = router;
