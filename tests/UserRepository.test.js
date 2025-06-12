const UserRepository = require('../src/repositories/UserRepository');
const User = require('../src/models/User');

describe('UserRepository', () => {
    const clearUsers = () => {
        const snapshot = [...Array(10).keys()];
        snapshot.forEach(i => UserRepository.delete(`${i}`));
    };

    // Clears repository before every test
    beforeEach(() => {
        for (let i = 0; i < 100; i++) {
            UserRepository.delete(`${i}`);
        }
    });

    // Ensures no users exist before start
    test('repository should start empty', () => {
        const allIds = Array.from({ length: 10 }, (_, i) => `${i}`);
        allIds.forEach(id => expect(UserRepository.findById(id)).toBeUndefined());
    });

    // Confirms user can be stored and retrieved
    test('save() and findById()', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        const found = UserRepository.findById('1');
        expect(found).toBeDefined();
        expect(found.id).toBe('1');

    });

    test('findById() should return undefined for unknown id', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user)
        expect(UserRepository.findById('999')).toBeUndefined();
    });

    // Ensures updates modify correct user or return null
    test('update() should modify existing user', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        const updated = UserRepository.update('1', { nome: 'Ana Maria' });
        expect(updated.nome).toBe('Ana Maria');
    });

    test('update() should return null for unknown id', () => {
        expect(UserRepository.update('404', { nome: 'X' })).toBeNull();
    });

    test('update() should not affect other users', () => {
        const u1 = new User('1', 'Ana', 'admin', '123', 'abc');
        const u2 = new User('2', 'Beto', 'user', '456', 'def');
        UserRepository.save(u1);
        UserRepository.save(u2);

        const result = UserRepository.update('999', { nome: 'Carlos' });
        expect(result).toBeNull();
        expect(UserRepository.findById('1').nome).toBe('Ana');
        expect(UserRepository.findById('2').nome).toBe('Beto');
    });

    // Checks if user removal works and doesn't affect others
    test('delete() should remove user', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        UserRepository.save(user);
        const deleted = UserRepository.delete('1');
        expect(deleted).toBe(true);
        expect(UserRepository.findById('1')).toBeUndefined();
    });

    test('delete() should return false for unknown id', () => {
        expect(UserRepository.delete('404')).toBe(false);
    });

    test('delete() should not affect other users', () => {
        const u1 = new User('1', 'Ana', 'admin', '123', 'abc');
        const u2 = new User('2', 'Beto', 'user', '456', 'def');
        UserRepository.save(u1);
        UserRepository.save(u2);

        const result = UserRepository.delete('999');
        expect(result).toBe(false);
        expect(UserRepository.findById('1')).toBeDefined();
        expect(UserRepository.findById('2')).toBeDefined();
    });

    // Ensures user is marked inactive or returns null if not found
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
