import { sleep } from '../utils/sleep'
import { updateGame } from './updateGame'

export async function displayAlert(alert: string) {
  await updateGame({ alert })
  await sleep(2500)
  await updateGame({ alert: null })
}
