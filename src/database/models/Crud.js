const connection = require('../connection');
const { ObjectID } = require('mongodb');
// const AppError = require('../utils/AppError');

class Crud {
  constructor(model) {
    this.Model = model;
  }
  async create(queryParams) {
    const db = await connection();

    const modelCreated = await db.collection(this.Model).insertOne(queryParams);

    const [model] = modelCreated.ops;
    return model;
  }

  async findOne(queryParams) {
    if (queryParams._id) {
      queryParams._id = ObjectID(queryParams._id);
    }
    const db = await connection();

    const modelInfo = await db.collection(this.Model).findOne(queryParams);

    return modelInfo;
  }

  async findAll() {
    const db = await connection();

    const modelsFound = await db.collection(this.Model).find().toArray();

    return modelsFound;
  }

  async update() {}

  async delete() {}
}

module.exports = Crud;
