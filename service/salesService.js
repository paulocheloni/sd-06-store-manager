const { ObjectId } = require('mongodb');
const { getProduct } = require('../models/productModel');
const { getSales, getById } = require('../models/saleModel');

const MIN_QUANTITY = 0;
const UNPROCESSABLE = 422;

const getAllSales = async () => await getSales();
const getSaleById = async () => await getById();

const validateSaleQuantity = async (req, res, next) => {
  req.body.forEach((item) => {
    const { quantity } = item;
    if (!quantity || quantity <= MIN_QUANTITY || typeof quantity !== 'number') {
      return res.status(UNPROCESSABLE).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });
  next();
};

const validateProductId = async (req, res, next) => {
  req.body.forEach( async (item) => {
    const { productId } = item;
    const product = await getProduct(productId);
    if (!ObjectId.isValid(productId) || !product) {
      return res.status(twoHundredTwentyTwo).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  next();
};

module.exports = {
  validateSaleQuantity,
  validateProductId,
  getAllSales,
  getSaleById,
};
