import { Alert } from '../types/gameTypes'
import { sleep } from '../utils/sleep'
import { updateGame } from './updateGame'

export async function displayAlert(alert: Alert) {
  await updateGame({ alert })
  await sleep(2500)
  await updateGame({ alert: null })
}
