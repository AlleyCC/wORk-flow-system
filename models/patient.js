const mongoose = require('mongoose')
const Schema = mongoose.Schema
const patientSchema = new Schema({
  patientId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  room: {
    type: Number,
  },
  status: {
    type: Number,
    required: true
  },
  ward: {
    type: String
  },
  doctor: {
    type: String,
    required: true
  },
  diagnose: {
    type: String,
    required: true
  },
  surgery: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Patient', patientSchema)