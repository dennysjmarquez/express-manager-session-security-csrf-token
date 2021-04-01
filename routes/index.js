const { Router } = require('express')
const routers = Router()

// middlewares
const { redirect, paths } = require('../middlewares/redirect.middleware')
const { checkCsrf } = require('../middlewares/checkCsrf.middleware')

// Controllers
const { indexView } = require('../controllers/index.controller')
const { dashboardView } = require('../controllers/dashboard.controller')
const { emailEditView } = require('../controllers/emailEdit.controller')
const { logoutView } = require('../controllers/logout.controller')

const { profileView } = require('../controllers/profile.controller')

// Routers
const { routerLogin } = require('../routes/login.router')
routers.use(routerLogin)
const { routerRegister } = require('../routes/register.route')
routers.use(routerRegister)

routers.get('/', [], indexView)
routers.get('/dashboard', [redirect(paths.login)], dashboardView)
routers.get('/profile', [redirect(paths.login)], profileView)
routers.get('/logout', [redirect(paths.login)], logoutView)
routers.post('/emailEdit', [
  checkCsrf(
    'pages/emailEdit',
    '/profile',
    {
      error: null,
      success: null,
      errorCsrf: true
    }
  ),
  redirect(paths.login)
], emailEditView)

module.exports = {
  routers
}
