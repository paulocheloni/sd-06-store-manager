const {
  validateNameLength,
  validateNameUnique,
  validateQuantitylargeThanZero,
  validateQuantityType,
} = require('../controllers/validate/validate');

const serviceProducts = require('../service/serviceProduct');

const SUCCESS_INSERTED = 201;
const UNPROCESSABLE = 422;
const codeType = 'invalid_data';

const postBar = async (req, res) => {
  const { name, quantity } = req.body;
  const valideLentgh = await validateNameLength(name);
  const valideUnique = await validateNameUnique(name);
  const valideQuantity = await validateQuantitylargeThanZero(quantity);
  const valideQuantityType = await validateQuantityType(quantity);
  
  switch (false) {
  case (valideLentgh):
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: '"name" length must be at least 5 characters long',
      }
    });
  case (valideUnique):
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: 'Product already exists',
      }
    });
  case (valideQuantityType):
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: '"quantity" must be a number',
      }
    });
  case (valideQuantity):
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  default:
    const data = await serviceProducts.serviceInsertProduct(req.body);
    return res.status(SUCCESS_INSERTED).json(data.ops[0]);
  }
};



module.exports = {
  postBar,
  // getBar,
};