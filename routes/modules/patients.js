const express = require('express')
const router = express.Router()
const patientsController = require('../../controllers/pages/patients-controller')

router.get('/', patientsController.getPatients)
router.get('/registered', patientsController.getStatus)
router.get('/pre-op', patientsController.getStatus)
router.get('/op', patientsController.getStatus)
router.get('/post-op', patientsController.getStatus)
module.exports = router
