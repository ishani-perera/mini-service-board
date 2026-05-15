const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Prevent mongoose from buffering commands indefinitely when the server is unreachable
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000, // fail fast if can't reach DB
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.__DB_CONNECTED = true;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('Continuing without DB — falling back to in-memory mock data for development.');
    global.__DB_CONNECTED = false;
  }
};

module.exports = connectDB;