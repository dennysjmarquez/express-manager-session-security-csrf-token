const { Router } = require('express')
const routerRegister = Router()

// Controllers
const {

  registerView,
  register

} = require('../controllers/register.controller')

routerRegister.get('/register', [], registerView)
routerRegister.post('/register', [], register)

module.exports = {
  routerRegister
}
