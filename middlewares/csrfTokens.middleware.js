const { v4: uuid } = require('uuid')
const { response, request } = require('express')

/**
 *
 *  Middleware que expone un objeto para crear los Token CSRF y asociarlos al usuario de la sesión activa,
 *  y chequear un token CSRF ver si este está asociado al usuario de la sesión activa
 *
 */

// Depende del del middleware localsUser.middleware
const csrfToken = (req = request, res = response, next) => {

  // Se crea una sola vez
  if (req.localsApp.csrfTokens) {

    next()
    return
  }

  try {

    const csrfTokens = new Map()

    function CsrfTokens () {}

    /**
     *
     * Genera un nuevo token CSRF y lo asocia al usuario según el id enviado
     *
     * @param userId {number} El Id del usuario de la Db
     * @return {string} Devuelve un único id generado y asociado al usuario del userId
     */
    CsrfTokens.prototype.getNewCsrfToken = function (userId) {

      // Se agrega el usuario a la lista de CSRF tokens
      csrfTokens.set(userId, new Set())

      const csrfToken = uuid()
      const refUser = csrfTokens.get(userId)

      refUser.add(csrfToken)

      // El token es válido solo por 30 segundos
      setTimeout(() => csrfTokens.delete(userId), 30000)

      return csrfToken

    }

    /**
     *
     * Chequea si un token CSRF está asociado al usuario del id enviado
     *
     * @param userId {number} El Id del usuario de la Db
     * @param csrfToken {string} Token CSRF
     * @return {boolean} Si el token está asociada al usuario de la sesión activa
     * devuelve un true de lo contrario un false
     */
    CsrfTokens.prototype.checkCsrf = function (userId, csrfToken) {

      return csrfTokens.get(userId).has(csrfToken)

    }

    req.localsApp.csrfTokens = new CsrfTokens()

    next()

  } catch (e) {
    next()
  }

}

module.exports = {
  csrfToken
}
