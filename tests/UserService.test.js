const userService = require('../src/services/UserService');

describe('UserService', () => {
    test('should create a user', () => {
        const data = { id: '1', nome: 'Ana', nivelAcesso: 'admin', cpf: '12345678900', senha: 'senha123' };
        const user = userService.createUser(data);
        expect(user).toMatchObject(data);
    });

    test('should get user by id', () => {
        const user = userService.getUser('1');
        expect(user).not.toBeNull();
        expect(user.nome).toBe('Ana');
    });

    test('should update user', () => {
        const updated = userService.updateUser('1', { nome: 'Ana Maria' });
        expect(updated.nome).toBe('Ana Maria');
    });

    test('should deactivate user', () => {
        const user = userService.deactivateUser('1');
        expect(user.ativo).toBe(false);
    });

    test('should delete user', () => {
        const success = userService.deleteUser('1');
        expect(success).toBe(true);
    });
});