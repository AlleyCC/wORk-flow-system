const mongoose = require('mongoose')
const Schema = mongoose.Schema
const patientSchema = new Schema({
  patientNumber: { // 病歷號
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  roomId: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }],
  ward: {
    type: String
  },
  doctorId: [{
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
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
