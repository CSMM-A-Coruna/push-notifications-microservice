import { checkNewComms } from './service/checkNewComms'

export const initializeMicroService = async () => {
  checkNewComms(5000)
}
