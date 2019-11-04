const mongoose = require('mongoose');

const initDB = () => {
  mongoose.connect(
    `${process.env.W2M_DB_URI}/${process.env.W2M_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );
};

module.exports.initDB = initDB;
