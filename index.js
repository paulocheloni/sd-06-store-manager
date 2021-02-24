const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productsController');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', products);

app.listen(port, () => console.log(`listening to port ${port}`)); 
