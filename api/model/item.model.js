const mongoose = require('mongoose')
const autoIncrement = require('mongoose-plugin-autoinc');

const itemSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  });
  
  itemSchema.plugin(autoIncrement.plugin, {
    model: 'Item',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  
  module.exports = mongoose.model('Item', itemSchema);