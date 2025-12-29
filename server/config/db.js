// db.js
const mongoose = require('mongoose');
// Use environment variable for MongoDB URI

const mongoURI = process.env.MONGO_URI ;
console.log('MongoDB URI:', mongoURI); // Debugging line
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;

