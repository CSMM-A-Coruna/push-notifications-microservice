import { executeQuery } from '../database'
import { sendNotification } from './sendNotification'

export const checkNewComms = async (ms) => {
  let lastId, newId
  // Cogemos el útlimo ID y lo asignamos
  const query = await executeQuery(
    'SELECT max(idcomunicaciondestino) as ID FROM comunicaciones_destinos'
  )
  lastId = query[0].ID
  while (true) {
    // Chequeamos la ultima ID y la asignamos
    const query = await executeQuery(
      'SELECT max(idcomunicaciondestino) as ID FROM comunicaciones_destinos'
    )

    newId = query[0].ID

    if (newId != lastId) {
      let diff = newId - lastId
      if (diff > 1) {
        for (let i = 0; i < diff; i++) {
          sendNotification(newId - i)
        }
      } else {
        sendNotification(query[0].ID)
      }
      lastId = newId
    }
    await sleep(ms)
  }
}

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec))
}
