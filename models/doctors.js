const mongoose = require('mongoose')
const Schema = mongoose.Schema
const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Doctor', doctorSchema)
