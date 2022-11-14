const randomName = require('chinese-random-name')
const bcrypt = require('bcrypt')
require('dotenv').config()

const db = require('../../config/mongoose')
const User = require('../users')
const { generateAccount } = require('../../helpers/seedDataHelpers')
const SEED_USER = require('./users')
const SEED_PASSWORD = '13579'
// 12筆user data, 6 for doctors, 6 for nurses

db.once('open', () => {
  console.log('MongoDB connected.')
  // 假資料
  const fakeData = Array.from({ length: 20 }, (_, i) => {
    return User.create({
      account: generateAccount(),
      name: randomName.names.get3(),
      password: bcrypt.hashSync(SEED_PASSWORD, 10),
      identityCode: i % 2 + 1
    })
  })
  // 種子資料
  const seedData = SEED_USER.users.map(user => {
    return User.create({
      account: user.account,
      name: user.name,
      password: bcrypt.hashSync(user.password, 10),
      identityCode: user.identityCode
    })
  })
  Promise.all(seedData)
    .then(() => Promise.all(fakeData))
    .then(() => {
      console.log('User data constructed.')
      process.exit()
    })
})
