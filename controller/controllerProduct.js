const { Router } = require('express');
const { ObjectId } = require('mongodb');
const rescue = require('express-rescue');
const products = require('../models/products');
const routerProducts = Router();
const verifyProduct = require('../middleware/products');

routerProducts.post('/', verifyProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await products.createProduct(name, quantity);

  return res.status(201).json(product);
}));

module.exports = routerProducts;
