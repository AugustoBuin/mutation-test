const userService = require('../src/services/UserService');

// Test suite for the UserService logic layer
describe('UserService', () => {

    // Tests if a user can be created with valid data
    test('should create a user', () => {
        const data = { id: '1', nome: 'Ana', nivelAcesso: 'admin', cpf: '12345678900', senha: 'senha123' };
        const user = userService.createUser(data);
        expect(user).toMatchObject(data);
    });

    // Tests if a previously created user can be retrieved by ID
    test('should get user by id', () => {
        const user = userService.getUser('1');
        expect(user).not.toBeNull();
        expect(user.nome).toBe('Ana');
    });

    // Tests if a user can be updated and returns the modified data
    test('should update user', () => {
        const updated = userService.updateUser('1', { nome: 'Ana Maria' });
        expect(updated.nome).toBe('Ana Maria');
    });

    // Tests if a user can be marked as inactive
    test('should deactivate user', () => {
        const user = userService.deactivateUser('1');
        expect(user.ativo).toBe(false);
    });

    // Tests if a user can be successfully deleted by ID
    test('should delete user', () => {
        const success = userService.deleteUser('1');
        expect(success).toBe(true);
    });
});