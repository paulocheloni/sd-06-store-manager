// aqui organizar os endpoints relativos aos produtos
// realizar todo tratamento das requisições
// CRUD com GET, GET :id, POST, PUT :id, DELETE :id
const { Router } = require('express');
const express = require('express');

// usando  o routes;
const routes = express.Router();

// importando as queries do Model
const Products = require('../models/Products') ;
// importando do Service
const ProductsService = require('../service/ProductsServices');

// No MAGIC NUMBERS
const SUCCESS = 200;


// como explicado na thread de 23/02/2021
// [https://trybecourse.slack.com/archives/C016CCMKN9E/p1614104536091400?thread_ts=1614103977.091000&cid=C016CCMKN9E]
routes.post('/', ProductsService.creatingValidProduct);

routes.get('/', async (_request, response) => {
  const allProductsList = await Products.getAllProducts();

  return response.status(SUCCESS).send(allProductsList);
});

// implementa o getProductsById (que já está sendo usado no delete uma vez que
// o requisito quer que retorne o produto)

routes.get('/:id', async (request, response) => {
  const { id } = request.params;
  const thisProductOnly = await Products.getProductById(id);

  return response.status(SUCCESS).send(thisProductOnly);
});

routes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, quantity} = request.body;
  await Products.updateProduct(id, name, quantity);;

  const updatedProduct = {
    _id: id,
    name,
    quantity
  };

  return response.status(SUCCESS).send(updatedProduct);
});

routes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const removeThis = await Products.getProductById(id) ;
  await Products.deleteProduct(id);

  return response.status(SUCCESS).send(removeThis);
});

module.exports = routes;
