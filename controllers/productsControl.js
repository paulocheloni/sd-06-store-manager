const { Router } = require('express');
const { productsHandlingDB } = require('../models');
const { productsServices, productsValidation } = require('../services');

const router = Router();
const SUCCESS = 200;
const Err = 422;

router.post('/',productsValidation.validateBody, productsServices.create);
router.get('/', productsServices.getAll);
router.get('/:id',productsValidation.idValid, productsServices.getById);
router.put('/:id',productsValidation.validateBody, productsServices.update);

module.exports = router;
