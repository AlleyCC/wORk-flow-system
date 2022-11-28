const patientsServices = require('../../services/patients-services')

const patientsController = {
  getPatients: (req, res, next) => {
    patientsServices.getPatients(req, (err, data) => {
      err ? next(err) : res.render('index', data)
    })
  },
  getRegistered: (req, res, next) => {
    patientsServices.getRegistered(req, (err, data) => {
      err ? next(err) : res.render('registered', data)
    })
  },
  getPreOp: (req, res, next) => {
    patientsServices.getPreOp(req, (err, data) => {
      err ? next(err) : res.render('pre-op', data)
    })
  }
}
module.exports = patientsController
