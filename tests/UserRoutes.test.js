const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/UserRoutes');
const UserRepository = require('../src/repositories/UserRepository');

// Simulando o app real
const app = express();
app.use(express.json());
app.use('/usuarios', userRoutes);

describe('User Routes', () => {
    const testUser = {
        id: '999',
        nome: 'Teste',
        nivelAcesso: 'admin',
        cpf: '00000000000',
        senha: '123'
    };

    beforeEach(() => {
        // Limpa repositório entre os testes
        for (let i = 0; i < 100; i++) {
            UserRepository.delete(`${i}`);
        }
        UserRepository.delete(testUser.id);
    });

    test('rota errada deve retornar 404', async () => {
        const res = await request(app).post('/').send({});
        expect(res.statusCode).toBe(404);
    });


    test('POST /usuarios - deve criar usuário', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(testUser);
    });

    test('POST /usuarios - deve falhar com dados inválidos', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({ id: '1' }); // incompleto
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('GET /usuarios/:id - deve retornar usuário existente', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).get(`/usuarios/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(testUser);
    });

    test('GET /usuarios/:id - deve retornar 404 se não existir', async () => {
        const res = await request(app).get('/usuarios/naoExiste');
        expect(res.statusCode).toBe(404);
    });

    test('PUT /usuarios/:id - deve atualizar usuário', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app)
            .put(`/usuarios/${testUser.id}`)
            .send({ nome: 'Novo Nome' });
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('Novo Nome');
    });

    test('DELETE /usuarios/:id - deve deletar usuário', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).delete(`/usuarios/${testUser.id}`);
        expect(res.statusCode).toBe(204);
    });

    test('PATCH /usuarios/:id/deactivate - deve desativar usuário', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).patch(`/usuarios/${testUser.id}/deactivate`);
        expect(res.statusCode).toBe(200);
        expect(res.body.ativo).toBe(false);
    });
});
