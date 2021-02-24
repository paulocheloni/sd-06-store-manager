const { ObjectId } = require('mongodb');
const Product = require('../model/Products');

// Return all Products
const getAll = async () => {
  return await Product.getAll();
};

// Return Product by ID
const findById = async (id) => {
  console.log('id', id);
  console.log(validateId(id));
  if (validateId(id)) {
    const product = await Product.findById(id);
    if (product) return { status: 'OK', product};
  }
  return { status: 'NOK', message: 'Wrong id format' };
};

// Add new Product
const create = async (name, quantity) => {
  const validation = await validateProduct(name, quantity);

  let response = {};
  if (validation === 'OK') {
    const product = await Product.create(name, quantity);
    response = { status: 'OK', product };
  } else {
    response = { status: 'NOK', message: validation };
  }
  return response;
};

// Get Product By Name
const getByname = async (name) => {
  return await Product.findByName(name);
};

// Check Exist Product, search by name
const existProductName = async (name) => {
  const product = await getByname(name);
  return product;
};

// Validation Id
const validateId = (id) => {
  const lengthId = 24;
  return (id.length === lengthId && id !== undefined);
};

// Validation Product fields
const validateProduct = async (name, quantity) => {
  const nameMaxLength = 5;
  const zero = 0;
  
  if (!name || name.length < nameMaxLength) {
    return '"name" length must be at least 5 characters long';
  };
  if (await existProductName(name)) {
    return 'Product already exists';
  };
  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
    return '"quantity" must be a number';
  };
  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return '"quantity" must be larger than or equal to 1';
  };
  return 'OK';
};

module.exports = {
  getAll,
  findById,
  create,
};
