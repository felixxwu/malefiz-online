import { gameStateHashTable } from '../signals/signals'
import { currentPlayer } from './currentPlayer'
import { updateGame } from './updateGame'

//@ts-ignore
window.roll = (number: number) => {
  updateGame({ dieRoll: number })
}

export async function rollDie() {
  const dieRoll = Math.floor(Math.random() * 6) + 1
  const reRoll = Math.floor(Math.random() * 6) + 1
  const player = currentPlayer()
  const distancesToFinish = player.positions.map(
    p => gameStateHashTable.value[p.circleId].distanceToFinish ?? Infinity
  )
  const closeToFinish = distancesToFinish.filter(d => d <= 3)
  const actualRoll = closeToFinish.length && dieRoll === 1 ? reRoll : dieRoll
  updateGame({ dieRoll: actualRoll })
}
