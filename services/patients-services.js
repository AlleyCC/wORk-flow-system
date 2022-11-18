const Patient = require('../models/patients')
const Room = require('../models/rooms')
const Doctor = require('../models/doctors')
const User = require('../models/users')
const Department = require('../models/departments')
const patientsServices = {
  // getPatients: (req, cb) => {
  //   Patient.find()
  //     .lean()
  //     .then(patients => {
  //       patients.map(patient => {
  //         const roomData = Room.findOne({ _id: patient.roomId[0] }).exec()

  //         const doctorData = Doctor.findOne({ _id: patient.doctorId[0] }).exec()
  //         console.log(doctorData)
  //         Promise.all([roomData, doctorData])
  //           .then(([room, doctor]) => {
  //             console.log(room)
  //             console.log('--------')
  //             console.log(doctor)
  //             return patient = ({

  //             })
  //           })
  //       })
  //     })
  //     .catch(err => cb(err))
  // }
  getPatients: (req, cb) => {
    Patient.find()
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
          room: patient?.roomId?.room,
          statusCode: patient?.roomId?.statusCode,
          doctor: patient.doctorId.userId.name
        }))
        return cb(null, { patientData })
      })
      .catch(err => cb(err))
  }
}
module.exports = patientsServices
