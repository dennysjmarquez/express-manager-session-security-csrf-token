const session = require('express-session')

const {
  NODE_ENV = 'development',
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'E7URZx8VDF17Z3igscqXXW2ZfhdCru',

  // Media hora
  SESSION_EXPIRES = 30 * 60 * 1000
} = process.env

// Constantes de las tiendas (connect-session) que determinan donde se van a guardar la sesión
const STORES = {
  MySQLStore: 'mySQLStore',
  FirebaseStore: 'firebaseStore',
  CacheManagerStore: 'cacheManagerStore'
}

/**
 *
 * Middleware que configura y implementa las sesiones
 *
 * @param store {string} Determinar la tienda en donde se van a guardar la sesión,
 * ejemplo STORES.FirebaseStore
 *
 * @return {function} Devuelve un controller de un middleware
 */
const sessionMiddleware = (store) => {

  let setStore

  switch (store) {

    case STORES.MySQLStore: {

      const MySQLStore = require('express-mysql-session')(session)

      setStore = new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'session_test',
        password: '123456',
        database: 'session_test'
      })

      break

    }
    case STORES.FirebaseStore: {

      // Archivo de configuración de la Cuentas de servicio de Firebase console, Firebase Admin SDK

      // En la raíz del proyecto
      // path: ./serviceAccountCredentials.json
      const FIREBASE_SERVICE_ACCOUNT = 'serviceAccountCredentials.json'

      // URL de la base de datos reactiva de Firebase
      // ejemplo: https://session-default-rtdb.firebaseio.com/
      const FIREBASE_DATABASE_URL = ''

      const FirebaseStore = require('connect-session-firebase')(session)
      const firebase = require('firebase-admin')

      const ref = firebase.initializeApp({
        credential: firebase.credential.cert(FIREBASE_SERVICE_ACCOUNT),
        databaseURL: FIREBASE_DATABASE_URL
      })

      setStore = new FirebaseStore({
        database: ref.database()
      })

      break

    }
    case STORES.CacheManagerStore: {

      const cacheManager = require('cache-manager')
      const CacheManagerStore = require('express-session-cache-manager').default
      const memoryStoreEngine = require('cache-manager-memory-store').default

      setStore = new CacheManagerStore(cacheManager.caching({
        store: memoryStoreEngine
      }))

      break
    }

  }

  return session({
    name: SESSION_NAME,
    saveUninitialized: false,
    resave: false,

    store: setStore,
    secret: SESSION_SECRET,

    cookie: {

      sameSite: true,
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: SESSION_EXPIRES,
      path: '/'

    }
  })

}

module.exports = {
  sessionMiddleware,
  SESSION_NAME,
  STORES
}
