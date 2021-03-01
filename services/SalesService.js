const { SalesModel } = require('../models');

const registerNewSale = async (newSale) => await SalesModel
  .registerNewSale(newSale);

const getAllSales = async () => await SalesModel
  .getAllSales();

const getSaleById = async (saleId) => {
  const saleById = await SalesModel
    .getSaleById(saleId);

  if (!saleById) {
    return {
      error: true,
      message: 'Sale not found',
    };
  }

  return saleById;
};

const editSale = async (id, saleToUpdate) => {
  return await SalesModel
    .editSale(id, saleToUpdate);
};

const removeSale = async (saleId) => {
  const saleById = await SalesModel
    .removeSale(saleId);

  if(!saleById) {
    return {
      error: true,
      message: 'Wrong sale ID format',
    };
  }

  return saleById;
};

module.exports = {
  registerNewSale,
  getAllSales,
  getSaleById,
  editSale,
  removeSale,
};