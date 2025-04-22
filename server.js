const express = require('express');
const bodyParser = require('body-parser');

// Criação da aplicação Express
const app = express();

// Middlewares
app.use(bodyParser.json()); // Substitui seu jsonParser individual
app.use(bodyParser.urlencoded({ extended: true })); // Para formulários HTML

// Middleware de autenticação
const auth = (req, res, next) => {
  const headers = req.headers;
  if (headers['x-dsn'] !== 'abcd-abcd') {
    return res.status(401).send('Auth Failed');
  }
  next();
};

// Rotas
app.get('/', (req, res) => {
  res.send('server teste');
});

app.get('/testgetrequest', (req, res) => {
  res.send('testeeee');
});

app.get('/testwithheader', auth, (req, res) => {
  res.send('teste');
});

app.post('/testwithheader', auth, (req, res) => {
  // Agora o bodyParser.json() está aplicado globalmente
  res.send(`! with header n body ${req.body.name}`);
});

// Exportação para testes
module.exports = app;

// Inicialização do servidor apenas quando não for teste
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  // Para possível desligamento limpo
  module.exports.server = server;
}
