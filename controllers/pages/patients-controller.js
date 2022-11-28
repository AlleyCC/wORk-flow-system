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
  },
  getOp: (req, res, next) => {
    patientsServices.getOp(req, (err, data) => {
      err ? next(err) : res.render('op', data)
    })
  },
  getPostOp: (req, res, next) => {
    patientsServices.getPostOp(req, (err, data) => {
      err ? next(err) : res.render('post-op', data)
    })
  }
}
module.exports = patientsController
