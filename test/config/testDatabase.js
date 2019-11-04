const mongoose = require('mongoose');
const { up } = require('migrate-mongo');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer({
  instance: {
    port: 27016,
    dbName: 'Wine2Me',
  },
  binary: {
    version: '4.2.0',
  },
});

const intiTestDB = async () => {
  const mongoUri = await mongoServer.getConnectionString();
  const connection = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    autoReconnect: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  await up(connection.connection.db);
  return connection;
};

const closeTestDB = async (connection) => {
  await connection.disconnect();
  await mongoServer.stop();
};

module.exports.intiTestDB = intiTestDB;
module.exports.closeTestDB = closeTestDB;
