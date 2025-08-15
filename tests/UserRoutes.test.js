const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
const UserRepository = require('../src/repositories/UserRepository');

// Simulating the real app
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
    const testUser = {
        id: '999',
        nome: 'Teste',
        nivelAcesso: 'admin',
        cpf: '00000000000',
        senha: '123'
    };

    // Clean repository before each test
    beforeEach(() => {
        for (let i = 0; i < 100; i++) {
            UserRepository.delete(`${i}`);
        }
        UserRepository.delete(testUser.id);
    });

    // Verifies unknown route returns 404.
    test('invalid route should return 404', async () => {
        const res = await request(app).post('/').send({});
        expect(res.statusCode).toBe(404);
    });

    // Validates both successful and failed user creation.
    test('POST /users - should create a user', async () => {
        const res = await request(app)
            .post('/users')
            .send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(testUser);
    });

    test('POST /users - should fail with invalid data', async () => {
        const res = await request(app)
            .post('/users')
            .send({ id: '1' }); // incomplete data 
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    // Ensures existing user is retrieved and 404 for non-existent
    test('GET /users/:id - should return existing user', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).get(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(testUser);
    });

    test('GET /users/:id - should return 404 if not found', async () => {
        const res = await request(app).get('/users/notExists');
        expect(res.statusCode).toBe(404);
    });

    // Confirms user is updated properly
    test('PUT /users/:id - should update user', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app)
            .put(`/users/${testUser.id}`)
            .send({ nome: 'New Name' });
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('New Name');
    });

    // Confirms deletion
    test('DELETE /users/:id - should delete user', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).delete(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(204);
    });

    // Confirms deactivation functionality
    test('PATCH /users/:id/deactivate - should deactivate user', async () => {
        UserRepository.save({ ...testUser });
        const res = await request(app).patch(`/users/${testUser.id}/deactivate`);
        expect(res.statusCode).toBe(200);
        expect(res.body.ativo).toBe(false);
    });
});
