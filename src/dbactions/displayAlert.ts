import { playAlert } from '../audio/playAlert'
import { Alert } from '../types/gameTypes'
import { sleep } from '../utils/sleep'
import { updateGame } from './updateGame'

export async function displayAlert(alert: Alert) {
  await updateGame({ alert })

  playAlert()

  await sleep(3500)
  await updateGame({ alert: null })
}
