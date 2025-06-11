const userController = require('../src/controllers/UserController');
const userService = require('../src/services/UserService');

jest.mock('../src/services/UserService');

describe('UserController', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        jest.clearAllMocks();
    });

    test('create() deve retornar 201 com usuário criado', () => {
        const mockUser = { id: '1', nome: 'Ana', nivelAcesso: 'admin', cpf: '123', senha: 'abc' };
        req.body = mockUser;
        userService.createUser.mockReturnValue(mockUser);

        userController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('read() deve retornar 404 se não encontrar', () => {
        req.params.id = '999';
        userService.getUser.mockReturnValue(null);

        userController.read(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
    });

    test('update() deve retornar usuário atualizado', () => {
        const mockUser = { id: '1', nome: 'Novo Nome' };
        req.params.id = '1';
        req.body = { nome: 'Novo Nome' };
        userService.updateUser.mockReturnValue(mockUser);

        userController.update(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('delete() deve retornar 204 se bem-sucedido', () => {
        req.params.id = '1';
        userService.deleteUser.mockReturnValue(true);

        userController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    test('deactivate() deve retornar usuário desativado', () => {
        const mockUser = { id: '1', ativo: false };
        req.params.id = '1';
        userService.deactivateUser.mockReturnValue(mockUser);

        userController.deactivate(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
});
