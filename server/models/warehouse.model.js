const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let warehouseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    stock: {
      type: Number,
      required: true
    },
  }],
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }
}, {
  timestamps: true
});


module.exports =  mongoose.model('warehouses', warehouseSchema);