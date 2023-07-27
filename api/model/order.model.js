const mongoose = require('mongoose')
const autoIncrement = require('mongoose-plugin-autoinc');

const orderSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    customerId: {
      type: Number,
      required: true,
    },
    itemId: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  });
  
  orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  
  module.exports = mongoose.model('Order', orderSchema);