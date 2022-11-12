const mongoose = require('mongoose')
const Schema = mongoose.Schema
const departmentSchema = new Schema({
  department: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Department', departmentSchema)