const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date,
    default: +new Date() + 30 * 24 * 60 * 60 * 1000
  },
  users: {
    admins: {
      type: Number,
      default: 1
    },
    operators: {
      type: Number,
      default: 1
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  warehouses: {
    type: Number,
    default: 0
  },
  warehousesLimit: {
    type: Number,
    default: 3
  }
}, {
  timestamps: true
});


module.exports =  mongoose.model('companies', companySchema);
