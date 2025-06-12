const userController = require('../src/controllers/UserController');
const userService = require('../src/services/UserService');

jest.mock('../src/services/UserService');

describe('UserController', () => {
    let req, res;

    // Prepares a fresh request/response object for each test
    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        jest.clearAllMocks();
    });

    // Verifies successful creation and error handling for invalid input
    test('create() should return 201 with created user', () => {
        const mockUser = { id: '1', nome: 'Ana', nivelAcesso: 'admin', cpf: '123', senha: 'abc' };
        req.body = mockUser;
        userService.createUser.mockReturnValue(mockUser);

        userController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('create() should handle errors', () => {
        req.body = {};
        const error = new Error('All fields are required.');
        userService.createUser.mockImplementation(() => { throw error; });

        userController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });

    // Confirms user is returned when found, and 404 when not
    test('read() should return user', () => {
        const mockUser = { id: '1', nome: 'Ana' };
        req.params.id = '1';
        userService.getUser.mockReturnValue(mockUser);

        userController.read(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('read() should return 404 if user not found', () => {
        req.params.id = '404';
        userService.getUser.mockReturnValue(null);

        userController.read(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    // Confirms updates are successful or return 404
    test('update() should return updated user', () => {
        const mockUser = { id: '1', nome: 'Novo Nome' };
        req.params.id = '1';
        req.body = { nome: 'Novo Nome' };
        userService.updateUser.mockReturnValue(mockUser);

        userController.update(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('update() should return 404 if user not found', () => {
        req.params.id = '404';
        userService.updateUser.mockReturnValue(null);

        userController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    // Tests deletion success and 404 on unknown user
    test('delete() should return 204 successful', () => {
        req.params.id = '1';
        userService.deleteUser.mockReturnValue(true);

        userController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    test('delete() should return 404 if user not found', () => {
        req.params.id = '404';
        userService.deleteUser.mockReturnValue(false);

        userController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });

    // Ensures deactivation works and returns appropriate response
    test('deactivate() should return deactivated user', () => {
        const mockUser = { id: '1', ativo: false };
        req.params.id = '1';
        userService.deactivateUser.mockReturnValue(mockUser);

        userController.deactivate(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('deactivate() should return 404 if user not found', () => {
        req.params.id = '404';
        userService.deactivateUser.mockReturnValue(null);

        userController.deactivate(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });
});
