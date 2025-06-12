const User = require('../models/User');
const userRepository = require('../repositories/UserRepository');

// Business logic layer for user operations
class UserService {

    // Creates a User and stores it in the repository
    createUser(data) {
        const { id, nome, nivelAcesso, cpf, senha } = data;
        const user = new User(id, nome, nivelAcesso, cpf, senha);
        return userRepository.save(user);
    }

    // Returns user by ID from the repository
    getUser(id) {
        return userRepository.findById(id);
    }

    // Updates user in the repository
    updateUser(id, data) {
        return userRepository.update(id, data);
    }

    // Deletes user from the repository
    deleteUser(id) {
        return userRepository.delete(id);
    }

    // Deactivates user in the repository
    deactivateUser(id) {
        return userRepository.deactivate(id);
    }
}

module.exports = new UserService();