const mongoose = require('mongoose');

const dbConnection = () => {
  DB_URL = 'mongodb://0.0.0.0:27017/contacts';

  mongoose.connect(DB_URL);

  const conn = mongoose.connection;

  conn.once('open', () => {
    console.log('Db initialized');
  });
};

module.exports = dbConnection;
