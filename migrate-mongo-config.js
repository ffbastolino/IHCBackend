require('dotenv').config();

const config = {
  mongodb: {

    url: process.env.W2M_DB_URI,

    databaseName: process.env.W2M_DB_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',
};

module.exports = config;
