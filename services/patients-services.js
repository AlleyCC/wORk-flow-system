const Patient = require('../models/patients')
const Room = require('../models/rooms')
const Doctor = require('../models/doctors')
const User = require('../models/users')
const Department = require('../models/departments')
const patientsServices = {
  getPatients: (req, cb) => {
    return Patient.find()
      .populate({ path: 'roomId', select: 'room statusCode' })
      .populate([{
        path: 'doctorId', populate: { path: 'userId', select: 'name' }
      }])
      .lean()
      .then(patients => {
        const patientData = patients.map(patient => ({
          id: patient._id,
          patientNumber: patient.patientNumber,
          name: patient.name,
          ward: patient.ward,
          diagnose: patient.diagnose,
          surgery: patient.surgery,
          room: patient?.roomId?.room, // if patientId存在則回傳
          statusCode: patient?.roomId?.statusCode, // if roomId存在則回傳
          doctor: patient.doctorId.userId.name
        }))
        return cb(null, { patientData })
      })
      .catch(err => cb(err))
  },
  getRegistered: (req, cb) => {
    // roomId !== null && statusCode === 1(找到有roomId且statusCode === 1的房間), doctorId === doctor._id JOIN doctor.userId === User._id(找到doctor.name及doctor.department)
    return Patient.aggregate([
      { $match: { $and: [{ roomId: { $ne: null } }] } }, // 找出有房間id的資料($and must be an array)
      { $lookup: { from: 'rooms', localField: 'roomId', foreignField: '_id', as: 'room_data' } }, // 查詢關聯資料Room
      { $match: { 'room_data.statusCode': { $eq: 1 } } }, // 找出room.statusCode === 1
      {
        $lookup: { // 找出doctor的關聯資料
          as: 'doctor_data',
          from: 'doctors',
          let: { doctorId: '$doctorId' },
          // 關聯doctors
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$doctorId'] } } }, 
            // 利用user關聯資料找出doctor.name
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user_data' } },
            // 利用user關聯資料找出doctor.department
            { $lookup: { from: 'departments', localField: 'departmentId', foreignField: '_id', as: 'department_data' } },
            // 整理需要回傳的資料
            { $project: { doctor_name: '$user_data.name', department: '$department_data.department' } }
          ]
        }
      }
    ])
      .then(patients => {
        const patientData = patients.map(patient => ({
          id: patient._id,
          patientNumber: patient.patientNumber,
          name: patient.name,
          ward: patient.ward,
          diagnose: patient.diagnose,
          surgery: patient.surgery,
          room: patient.room_data[0].room,
          statusCode: patient.room_data[0].statusCode,
          doctor: patient.doctor_data[0].doctor_name[0],
          department: patient.doctor_data[0].department[0]
        }))
        return cb(null, { patientData })
      })
      .catch(err => cb(err))
  }
}
module.exports = patientsServices
