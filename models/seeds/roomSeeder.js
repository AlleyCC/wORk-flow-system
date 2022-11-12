require('dotenv').config()

const db = require('../../config/mongoose')
const Room = require('../rooms')

const generateStatusCode = () => {
  return Math.ceil(Math.random() * 4)
 
}
db.once('open', ()=> {
  console.log('MongoDB connected!')
  Promise.all(Array.from({ length: 20 }, (_, i) => {
    return Room.create({
      room: i + 1,
      statusCode: generateStatusCode()
    })
  }))
  .then(() => {
    console.log('Room seed data constructed.')
    process.exit()
  })
})