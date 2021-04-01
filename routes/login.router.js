const { Router } = require('express')
const routerLogin = Router()

// Middlewares
const { redirect, paths } = require('../middlewares/redirect.middleware')
const { usersDb } = require('../middlewares/db.middleware')

// Controllers
const {

  loginView,
  login

} = require('../controllers/login.controller')


routerLogin.get('/login', [redirect(paths.dashboard)], loginView)
routerLogin.post('/login', [usersDb, redirect(paths.dashboard)], login)

module.exports = {
  routerLogin
}
