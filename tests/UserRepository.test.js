const UserRepository = require('../src/repositories/UserRepository');
const User = require('../src/models/User');

describe('UserRepository', () => {
    beforeEach(() => {
        // Limpar usuários entre os testes
        while (UserRepository.delete('1')) { }
    });

    test('save() and findById()', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        expect(UserRepository.findById('1')).toEqual(user);
    });

    test('update() should modify existing user', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        const updated = UserRepository.update('1', { nome: 'Ana Maria' });
        expect(updated.nome).toBe('Ana Maria');
    });

    test('update() should return null for unknown id', () => {
        expect(UserRepository.update('404', { nome: 'X' })).toBeNull();
    });

    test('delete() should remove user', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        expect(UserRepository.delete('1')).toBe(true);
        expect(UserRepository.findById('1')).toBeUndefined();
    });

    test('delete() should return false for unknown id', () => {
        expect(UserRepository.delete('404')).toBe(false);
    });

    test('deactivate() should mark user as inactive', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        const result = UserRepository.deactivate('1');
        expect(result.ativo).toBe(false);
    });

    test('deactivate() should return null for unknown user', () => {
        expect(UserRepository.deactivate('404')).toBeNull();
    });
});
