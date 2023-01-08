const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB: ', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost:27017/nodepop')

module.exports = mongoose.connection;