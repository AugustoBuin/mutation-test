const User = require('../src/models/User');

describe('User model', () => {
    test('should create valid user and default ativo to true', () => {
        const user = new User('1', 'Ana', 'admin', '123', 'abc');
        expect(user).toBeInstanceOf(User);
        expect(user.ativo).toBe(true);
    });

    test('should throw error with correct message if id is missing', () => {
        expect(() => { new User(undefined, 'Ana', 'admin', '123', 'abc') })
            .toThrow('All fields are required.');
    });

    test('should throw error with correct message if nome is missing', () => {
        expect(() => { new User('1', undefined, 'admin', '123', 'abc') })
            .toThrow('All fields are required.');
    });

    test('should throw error with correct message if nivelAcesso is missing', () => {
        expect(() => { new User('1', 'Ana', undefined, '123', 'abc') })
            .toThrow('All fields are required.');
    });

    test('should throw error with correct message if cpf is missing', () => {
        expect(() => { new User('1', 'Ana', 'admin', undefined, 'abc') })
            .toThrow('All fields are required.');
    });

    test('should throw error with correct message if senha is missing', () => {
        expect(() => { new User('1', 'Ana', 'admin', '123', undefined) })
            .toThrow('All fields are required.');
    });

});
