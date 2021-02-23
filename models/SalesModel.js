const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold }))
    .then((result) => result);

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return product;
};

const delById = async (id) => {
  connection()
    .then((db) => db.collection('sales').deleteOne({ '_id': ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  delById,
};
