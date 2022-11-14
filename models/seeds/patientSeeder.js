const { faker } = require('@faker-js/faker')
const randomName = require('chinese-random-name')
const { generatePatientNums, generateWard } = require('../../helpers/seedDataHelpers')
// faker.lorem.words()
require('dotenv').config()

const db = require('../../config/mongoose')
const Patient = require('../patients')
const Room = require('../rooms')
const Doctor = require('../doctors')
// 60筆病人假資料
db.once('open', () => {
  // 找出隨機分配room.id和doctor.id
  console.log('MONGODB connected.')
  Promise.all([
    Room.find(),
    Doctor.find()
  ])
    .then(([rooms, doctors]) => {
      const roomData = rooms.map(room => room._id)
      const doctorData = doctors.map(doctor => doctor._id)
      return Promise.all(Array.from({ length: 60 }, (_, i) => {
        return Patient.create({
          patientNumber: generatePatientNums(8),
          name: randomName.names.get3(),
          roomId: roomData[i] ? roomData[i] : null, // 20個room,每個room一次只能提供給1個patient
          ward: generateWard(),
          doctorId: doctorData[i % doctorData.length],
          diagnose: faker.lorem.words(),
          surgery: faker.lorem.words()
        })
      }))
    })
    .then(() => {
      console.log('patient data constructed.')
      process.exit()
    })
})
