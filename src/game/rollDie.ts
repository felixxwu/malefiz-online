import { sleep } from '../utils/sleep'
import { updateGameState } from '../utils/updateGameState'

export async function rollDie() {
  const dieRoll = Math.floor(Math.random() * 6) + 1
  updateGameState(() => ({ dieRoll }))
  await sleep(1000)
}
