const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  
  return {
    id: insertedId,
    name,
    quantity,
  };;
};

const getAllProducts = async() => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch(err => console.error(err));
};

module.exports = {
  createProduct,
  getAllProducts,
  findByName,
};
