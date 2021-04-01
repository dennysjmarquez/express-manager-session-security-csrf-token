const express = require('express')
const path = require('path')

// Middlewares
const { sessionMiddleware, STORES } = require('./middlewares/session.middleware')
const bodyParser = require('body-parser')
const { csrfToken } = require('./middlewares/csrfTokens.middleware')
const { usersDb } = require('./middlewares/db.middleware')

// Routes
const { routers } = require('./routes')

const {
  PORT = 3500
} = process.env

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares

app.use('/', express.static(__dirname + '/public'))

/**
 *
 * Middleware que expone el app.locals en req.localsApp,
 * Para agregar datos globales compartidos para todos los usuarios en el servidor en general,
 * el Middleware db.middleware lo necesita
 *
 */
app.use((req, res, next) => {

  req.localsApp = app.locals

  next()

})

/**
 *
 * Middleware para recibir los datos de forms POST,
 * parse application/x-www-form-urlencoded
 *
 */
app.use(bodyParser.urlencoded({ extended: false }))

app.use(sessionMiddleware(STORES.CacheManagerStore)) // <-- Middleware que crea y configura la sesión

app.use(usersDb) // <-- Middleware que crea la Db de usuario localmente para el servidor

app.use(csrfToken) // <--  Middleware que crea un objeto para manejar los tokens CSRF

// Rutas
app.use(routers)

app.listen(PORT, () => console.log(
  `RUN - Listening @ http://localhost:${PORT}`
))
