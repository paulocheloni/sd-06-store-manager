const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createSale = async (sales) => {
  console.log('model - sales');
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return { _id: insertedId, itensSold: sales };
};

const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return allSales;
};

const findById = async (id) => {
  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return saleById;
};

module.exports = {
  createSale,
  getAllSales,
  findById,
};
