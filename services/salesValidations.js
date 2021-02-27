const productsModel = require('../models/productsModel');

const collectionProducts = 'products';

const objError = (message, status) => ({ message, status });
const itIsString = (parameter) => typeof parameter === 'string';
const itIsEqual = (parameter1, parameter2) => parameter1 === parameter2;
const itIsLessThan = (parameter1, parameter2) => parameter1 < parameter2;

const validationSalesQuantity = (sale) => {
  const { quantity } = sale;
  const typeError422 = 422;
  const zero = 0;

  switch (true) {
  case itIsEqual(quantity, zero):
  case itIsLessThan(quantity, zero):
  case itIsString(quantity):
    return objError('Wrong product ID or invalid quantity', typeError422);
  default: return null;
  }  
};

const validationSalesProductId = async (sale) => {
  const { productId } = sale;
  const typeError422 = 422;
  
  try {
    const product = await productsModel.findById(collectionProducts, productId);
    if (!product) {
      return objError('Wrong product ID or invalid quantity', typeError422);
    }
  } catch {
    return objError('Wrong product ID or invalid quantity', typeError422);
  }  
  return null;
};

module.exports = {
  validationSalesQuantity,
  validationSalesProductId
};
