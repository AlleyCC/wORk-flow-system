const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roomSchema = new Schema({
  room: {
    type: Number
  },
  statusCode: {
    type: Number, // 手術狀態: 用數字表示
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Room', roomSchema)
