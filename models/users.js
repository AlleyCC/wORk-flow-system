const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  account: { // 員工編號
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
  identityCode: { // 身分: doctor / nurse
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('User', userSchema)
