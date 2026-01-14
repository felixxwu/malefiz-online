import { gameStateHashTable } from '../signals/signals'
import { GameState } from '../types/gameTypes'
import { currentPlayer } from '../signals/getters/currentPlayer'
import { updateGame } from './updateGame'
import { playChord } from '../audio/playChord'
import { consts } from '../config/consts'

//@ts-ignore
window.roll = (number: number) => {
  updateGame({ dieRoll: number })
}

export async function rollDie(additionalGameState?: Partial<GameState>, range: number = 6) {
  const dieRoll = Math.floor(Math.random() * range) + 1
  const reRoll = Math.floor(Math.random() * range) + 1
  const player = currentPlayer.value
  const distancesToFinish = player.positions.map(
    p => gameStateHashTable.value[p.circleId].distanceToFinish ?? Infinity
  )
  const closeToFinish = distancesToFinish.filter(d => d <= 3)
  const actualRoll = closeToFinish.length && dieRoll === 1 ? reRoll : dieRoll
  playChord(consts.chords[actualRoll as keyof typeof consts.chords])
  await updateGame({ ...additionalGameState, dieRoll: actualRoll })
}
