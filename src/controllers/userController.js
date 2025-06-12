const userService = require('../services/UserService');

// Handles user-related HTTP requests by calling the service layer.
class UserController {
    // Creates a user and returns it with status 201, or error 400 if validation fails
    create(req, res) {
        try {
            const user = userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Fetches user by ID; returns 200 with data or 404 if not found
    read(req, res) {
        const user = userService.getUser(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    }

    update(req, res) {
        const user = userService.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    }

    delete(req, res) {
        const success = userService.deleteUser(req.params.id);
        if (!success) return res.status(404).json({ error: 'User not found.' });
        res.status(204).send();
    }

    deactivate(req, res) {
        const user = userService.deactivateUser(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    }
}

module.exports = new UserController();