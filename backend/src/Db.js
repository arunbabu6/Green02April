const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Connects to the MongoDB database.
 * @returns {mongoose.Connection} The MongoDB connection object.
 */
async function connectDB() {
  const url = process.env.MONGO_URI;

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected`);
  } catch (err) {
    console.error(`Connection error: ${err.message}`);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err) => {
    console.error(`Connection error: ${err}`);
  });

  return dbConnection;
}

module.exports = connectDB;
