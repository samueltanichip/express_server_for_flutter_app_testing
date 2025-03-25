const request = require('supertest');
const app = require('../server'); // Corrigido para apontar para server.js

describe('Testes do Servidor Express', () => {
  it('Deve retornar status 200 na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar "Hello World" na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World');
  });
});
