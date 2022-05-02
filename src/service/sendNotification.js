import { executeQuery } from '../database'
var admin = require('firebase-admin')

var serviceAccount = require('../../gestorescolar-b6bd9-firebase-adminsdk-z9dbs-851726f54b.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const tiposUsuarios = {
  1: 'alumnos',
  2: 'familias',
  3: 'profesores',
}

export const sendNotification = async (idComunicacionDestino) => {
  try {
    // Cogemos los datos del destino de la comunicación
    const com = await executeQuery(
      `SELECT * FROM comunicaciones_destinos WHERE idcomunicaciondestino = ${idComunicacionDestino}`
    )

    // Chequeamos que el tipo de destino es usuario `familia` (que son los que tienen acceso a la aplicación móvil)
    if (com[0].tipodestino == 2) {
        const tokenQuery = await executeQuery(
        `SELECT * FROM familias WHERE id = ${com[0].iddestino}`
      )
      const token = tokenQuery[0].fcm_token
      if (token) {
        const queryPayload = await executeQuery(
          `SELECT asunto, tiporemite, idremite FROM comunicaciones WHERE idcomunicacion = ${com[0].idcomunicacion}`
        )

        let tablaUsuario
        switch (queryPayload[0].tiporemite) {
          case 1:
            tablaUsuario = 'alumnos'
            break
          case 2:
            tablaUsuario = 'familias'
            break
          case 3:
            tablaUsuario = 'profesores'
            break
        }

        const queryNombreRemite = await executeQuery(
          `SELECT CONCAT(nombre, ' ', apellido1) AS nombre FROM ${tablaUsuario} WHERE id = ${queryPayload[0].idremite}`
        )

        let payload = {
          notification: {
            title: 'Nueva comunicación: ' + queryPayload[0].asunto,
            body: 'De: ' + queryNombreRemite[0].nombre,
          },
        }

        let options = {
          priority: 'high',
          timeToLive: 60 * 60 * 24,
        }

        admin
          .messaging()
          .sendToDevice(token, payload, options)
          .then(function (response) {
            if (response.failureCount == 0) {
              console.log('Notificación enviada')

            } else {
              console.log('Notificación no-enviada, error')
              console.log(response.results[0].error)
            }
          })
      } else {
        console.log('no tipo destino correcto')
      }
    }
  } catch (err) {
    console.log(err)
  }
}
