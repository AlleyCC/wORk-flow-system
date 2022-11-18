const express = require('express')
const router = express.Router()

const patientsList = require('./modules/patients')

router.use('/patients', patientsList)

module.exports = router
