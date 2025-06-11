const User = require('../src/models/User');

describe('User model', () => {
    test('should create valid user', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        expect(user).toBeInstanceOf(User);
    });

    test('should throw error if id is missing', () => {
        expect(() => new User(null, 'Ana', 'admin', '123', 'abc')).toThrow();
    });

    test('should throw error if nome is missing', () => {
        expect(() => new User('1', null, 'admin', '123', 'abc')).toThrow();
    });

    test('should throw error if nivelAcesso is missing', () => {
        expect(() => new User('1', 'Ana', null, '123', 'abc')).toThrow();
    });

    test('should throw error if cpf is missing', () => {
        expect(() => new User('1', 'Ana', 'admin', null, 'abc')).toThrow();
    });

    test('should throw error if senha is missing', () => {
        expect(() => new User('1', 'Ana', 'admin', '123', null)).toThrow();
    });
});
