const { response, request } = require('express')

// Constante de path para la redirección
const paths = {

  login: 'login',
  dashboard: 'dashboard'

}

/**
 *
 * Middleware para redireccionar a una URL según el caso
 *
 * @param path {string} Determina donde se va a redirigir
 * @return {function} Devuelve un controller de un middleware
 */
const redirect = (path) => {

  switch (path) {

    case paths.login: {

      return (req = request, res = response, next) => {

        if (!req.session.userId) {
          res.redirect('/login')
        } else {
          next()
        }

      }
    }
    case paths.dashboard: {

      return (req, res, next) => {

        if (req.session.userId) {
          res.redirect('/dashboard')
        } else {
          next()
        }

      }
    }

  }

}

module.exports = {
  redirect,
  paths
}
