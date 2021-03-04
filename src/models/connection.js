
const { MongoClient } = require('mongodb');

//local test
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

//remote test
//const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DBNAME = 'StoreManager';


const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DBNAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
