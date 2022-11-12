require('dotenv').config()

const db = require('../../config/mongoose')
const Department = require('../departments')
const SEED_DEPARTMENT = [{
  "department": "婦產科"
  }, {
  "department": "一般外科"
  }, {
  "department": "泌尿外科"
  }, {
  "department": "神經外科"
  }, {
  "department": "耳鼻喉科"
  }, {
  "department": "大腸直腸外科"
  }, {
  "department": "骨科"
  }, {
  "department": "眼科"
  }, {
  "department": "胸腔外科"
  }, {
  "department": "心臟血管外科"
  }, {
  "department": "口腔外科"
  }]

db.once('open', () => {
  console.log('MongoDB connected!')
  Promise.all(SEED_DEPARTMENT.map(department => 
    Department.create(department)))
    .then(() => {
      console.log('Department seed data created successfully.')
      process.exit()
    })
})