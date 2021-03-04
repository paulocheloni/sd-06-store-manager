const { response } = require('express');
const productsModels = require('../models/productsModels');

const compare ={
  minSize: 5,
  zeroQuantity: 0,
  hexObjectedId: 24,
};

const statusCode = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE: 422,
};

const message = {
  nameLength: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists',
  greaterThanZero: '"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
};

const messageError = (code, message) => ({ 
  code,
  err: {
    code: 'invalid_data',
    message
  }
});

const responseWith = (code, message, response) => {
  const err = {
    err: {
      code: 'invalid_data',
      message
    },
  };
  return response.status(code).json(err);
};

// Funções de validação;
const minLengthOf = (value, number) => (value.length < number);
const greaterThan = (value, number) => (Math.floor(value) <= number);
const mustBeNumber = (value) => (typeof value !== 'number');
const productExists = async (value) => {
  const productFound = await productsModels.getByName(value);
  if (productFound !== null) return true;
};

// funções da camada de serviço;
const getAllProducts = async (_request, response) => {
  const allProducts = await productsModels.getAll();
  // console.log('allProducts[0]', allProducts[0]);
  return response.status(statusCode.OK).json({products: allProducts});
};

const getById = async (request, response) => {
  const { id } = request.params;
  console.log('id', id);
  
  if (id.length !== compare.hexObjectedId) {
    return responseWith(statusCode.UNPROCESSABLE, message.wrongIdFormat, response);
  }

  const productFound = await productsModels.getById(id);
  console.log('productFound', productFound);

  if (productFound === null) {
    return messageError(statusCode.UNPROCESSABLE, message.wrongIdFormat);
  }

  return response.status(statusCode.OK).json(productFound);
};

  

const createNewProduct = async (name, quantity) => {
  switch (true) {
  case minLengthOf(name, compare.minSize):
    return messageError(statusCode.UNPROCESSABLE, message.nameLength);
  case greaterThan(quantity, compare.zeroQuantity):
    return messageError(statusCode.UNPROCESSABLE, message.greaterThanZero);
  case mustBeNumber(quantity):
    return messageError(statusCode.UNPROCESSABLE, message.mustBeNumber);
  case await productExists(name):
    return messageError(statusCode.UNPROCESSABLE, message.alreadyExists);
  default:
    break;
  }

  const product = await productsModels.createNewProduct(name, quantity);
  
  
  return {
    code: statusCode.CREATED,
    product
  };
};

const deleteAllProducts = async () => {
  await productsModels.deleteAllProducts();
  // return response.status(statusCode.OK).json({ message: 'produtos apagados'});
  return {
    code: statusCode.OK,
    message: 'Collection apagada'
  };
};

module.exports = {
  getAllProducts,
  createNewProduct,
  deleteAllProducts,
  getById,
};
