const ProductsModel = require('../models/ProductsModel');
const { Router } = require('express');

const ProductsRouter = Router();

const OK = 200, CREATED = 201, UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;
const MIN_CHARACTERS = 5;

ProductsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  let { quantity } = req.body;
  quantity = Number(quantity);

  if (name.length < MIN_CHARACTERS) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '\"name\" length must be at least 5 characters long' });
  }
  if (quantity <= ZERO) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '\"quantity\" must be larger than or equal to 1' });
  }
  if (typeof quantity === NaN) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '\"quantity must be a number' });
  }
  const { insertedId } = await ProductsModel.create(name, quantity);
  return res.status(CREATED).json({ id: insertedId, name, quantity });
});

ProductsRouter.get('/', async (_req, res) => {
  const products = await ProductsModel.getAll();
  return res.status(OK).json({ products });
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getById(id);
  if (!product) return res.status(UNPROCESSABLE_ENTITY)
    .json({ message: 'wrong id format' });
  return res.status(OK).json(product);
});

ProductsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getById(id);
  if (!product) return res.status(UNPROCESSABLE_ENTITY)
    .json({ message: 'wrong id format' });
  await ProductsModel.delById(product._id);
  return res.status(OK).json(product);
});

module.exports = ProductsRouter;
