import { gameState, gameStateHashTable } from '../signals/signals'
import { GameState } from '../types/gameTypes'
import { currentPlayer } from '../signals/getters/currentPlayer'
import { updateGame } from './updateGame'
import { playChord } from '../audio/playChord'
import { consts } from '../config/consts'

//@ts-ignore
window.roll = (number: number) => {
  rollDie(undefined, 6, number)
}

export async function rollDie(
  additionalGameState?: Partial<GameState>,
  range: number = 6,
  forcedRoll?: number
) {
  let actualRoll: number
  if (forcedRoll !== undefined) {
    actualRoll = forcedRoll
  } else {
    const dieRoll = Math.floor(Math.random() * range) + 1
    const reRoll = Math.floor(Math.random() * range) + 1
    const player = currentPlayer.value
    const distancesToFinish = player.positions.map(
      p => gameStateHashTable.value[p.circleId].distanceToFinish ?? Infinity
    )
    const closeToFinish = distancesToFinish.filter(d => d <= 3)
    actualRoll = closeToFinish.length && dieRoll === 1 ? reRoll : dieRoll
  }

  playChord(consts.chords[actualRoll as keyof typeof consts.chords])

  const player = currentPlayer.value
  const updateData: Partial<GameState> = { ...additionalGameState, dieRoll: actualRoll }
  if (actualRoll === 6) {
    updateData.players = gameState.value!.players.map(p => {
      if (p.id === player.id) {
        return {
          ...p,
          stats: {
            ...p.stats,
            sixesRolled: p.stats.sixesRolled + 1,
          },
        }
      }
      return p
    })
  }

  await updateGame(updateData)
}
