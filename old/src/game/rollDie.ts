import { updateGameState } from '../utils/updateGameState'

//@ts-ignore
window.roll = (number: number) => {
  updateGameState(() => ({ dieRoll: number }))
}

export async function rollDie() {
  const dieRoll = Math.floor(Math.random() * 6) + 1
  updateGameState(() => ({ dieRoll }))
}
