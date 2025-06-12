// Defines user-related routes and links them to the controller
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', userController.create);// POST /users → create a new user
router.get('/:id', userController.read);// GET /users/:id → get user by ID
router.put('/:id', userController.update);// PUT /users/:id → update user by ID
router.delete('/:id', userController.delete);// DELETE /users/:id → delete user by ID
router.patch('/:id/deactivate', userController.deactivate);// PATCH /users/:id/deactivate → deactivate user by ID

module.exports = router;
