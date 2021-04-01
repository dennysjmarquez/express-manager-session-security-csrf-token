const { response, request } = require('express')

/**
 *
 * Middleware para proteger una ruta sensible,
 * chequea que se mande en el body el valor
 * de un input cuyo name sea csrf
 *
 * @param render {string} La dirección de la vista que se va a renderizar
 * si el Token enviado no está asociado al usuario de la sesión activa
 * Ejemplo: 'pages/profiler'
 *
 * @param redirectLink {string}  url a la que se va redirigir la pagina
 * luego que pasa un tiempo predeterminado de 5 segundos esto para mostrar
 * un mensaje de error o éxito según el caso
 *
 * @param renderEJS {Object} Grupos de variables posiblemente necesarias para la vista ejs
 * @return {function} Devuelve un controller de un middleware
 */

// Depende del del middleware localsUser.middleware
const checkCsrf = (render = '', redirectLink = '', renderEJS = {}) => {

  return (req = request, res = response, next) => {

    try {

      const userId = req.session.user.id
      const csrfToken = req.body.csrf

      if (csrfToken && req.localsApp.csrfTokens.checkCsrf(userId, csrfToken)) {

        return next()

      }

    } catch (e) {}

    if (render !== '' && redirectLink !== '') {

      res.render(render, {
        redirectLink,
        ...renderEJS
      })

    } else {

      return res.status(422).json({
        status: 422,
        msg: 'Token CSRF no válido o faltante'
      })

    }

  }

}

module.exports = {
  checkCsrf
}
