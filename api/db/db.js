const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI

const connectToDatabase = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.log('MongoDB connection error:', error);
    }
  };
  
  module.exports = connectToDatabase;