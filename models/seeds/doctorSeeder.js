require('dotenv').config()

const db = require('../../config/mongoose')
const Doctor = require('../doctors')
const User = require('../users')
const Department = require('../departments')

db.once('open', () => {
  // 找出identityCode === 1的user._id
  // 隨機分配department._id
  Promise.all([User.find({ identityCode: 1 }), Department.find()])
    .then(([users, departments]) => {
      const userId = users.map(user => user._id)
      const departmentId = departments.map(department => department._id)
      return Promise.all(Array.from({ length: userId.length }, (_, i) => {
        return Doctor.create({
          userId: userId[i],
          departmentId: departmentId[i]
        })
      }))
    })
    .then(() => {
      console.log('Doctor seed data constructed.')
      process.exit()
    })
})
