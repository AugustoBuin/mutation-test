const User = require('../models/User');
const userRepository = require('../repositories/UserRepository');

class UserService {
    createUser(data) {
        const { id, nome, nivelAcesso, cpf, senha } = data;
        const user = new User(id, nome, nivelAcesso, cpf, senha);
        return userRepository.save(user);
    }

    getUser(id) {
        return userRepository.findById(id);
    }

    updateUser(id, data) {
        return userRepository.update(id, data);
    }

    deleteUser(id) {
        return userRepository.delete(id);
    }

    deactivateUser(id) {
        return userRepository.deactivate(id);
    }
}

module.exports = new UserService();