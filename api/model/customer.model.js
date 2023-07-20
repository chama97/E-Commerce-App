const mongoose = require('mongoose')
const autoIncrement = require('mongoose-plugin-autoinc');

const customerSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nid: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
    },
  });
  
  customerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  
  module.exports = mongoose.model('Customer', customerSchema);
  