const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  rut: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['admin', 'company', 'operator'],
    default: 'operator'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  warehouses: [{
    type: Schema.Types.ObjectId,
    ref: 'Warehouses'
  }],
  phone: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    default: true
  },
  force_password_update: {
    type: Boolean,
    default: true
  },
  hash: String,
  salt: String
}, {
  timestamps: true
});

module.exports = mongoose.model('users', userSchema);