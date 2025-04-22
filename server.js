const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


const auth = (req, res, next) => {
  const headers = req.headers;
  if (headers['x-dsn'] !== 'abcd-abcd') {
    return res.status(401).send('Auth Failed');
  }
  next();
};


app.get('/', (req, res) => {
  res.send('server teste');
});

app.get('/testgetrequest', (req, res) => {
  res.send('teste polling');
});

app.get('/testwithheader', auth, (req, res) => {
  res.send('teste');
});

app.post('/testwithheader', auth, (req, res) => {
  
  res.send(`! with header n body ${req.body.name}`);
});


module.exports = app;


if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  
  module.exports.server = server;
}
