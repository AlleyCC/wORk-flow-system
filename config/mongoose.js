const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI)
db.on('error', () =>
  console.log('Error with MongoDB.')
)

db.once('open', () => {
  console.log('MONGODB connected.')
})

module.exports = db
