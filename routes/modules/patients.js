const express = require('express')
const router = express.Router()
const patientsController = require('../../controllers/pages/patients-controller')

router.get('/', patientsController.getPatients)
router.get('/registered', patientsController.getRegistered)
router.get('/pre-op', patientsController.getPreOp)
router.get('/op', patientsController.getOp)
module.exports = router
