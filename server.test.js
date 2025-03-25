// server.test.js
const request = require('supertest');
const app = require('../src/app'); // ajuste o caminho conforme sua estrutura

describe('Testes do Servidor Express', () => {
  // Teste para rota GET básica
  it('deve retornar 200 para a rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Teste para verificar conteúdo da resposta
  it('deve retornar mensagem de boas-vindas', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Bem-vindo');
  });

  // Teste para rota POST
  it('deve criar um novo recurso', async () => {
    const newItem = { name: 'Test Item' };
    const response = await request(app)
      .post('/items')
      .send(newItem);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
