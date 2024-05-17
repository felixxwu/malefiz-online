import { gameState } from '../signals'
import { GameState } from '../../types/gameTypes'
import { getNewItems } from './getNewItems'
import { getNextPlayer } from '../getters/getNextPlayer'

export function getNextTurnGameState(
  nextTurn: boolean,
  dontPutItemsOnCircles: string[]
): Partial<GameState> {
  const randomEvent =
    gameState.value!.eventsEnabled[
      Math.floor(Math.random() * gameState.value!.eventsEnabled.length)
    ]

  return {
    ...(nextTurn
      ? {
          playerTurn: getNextPlayer(),
          items: getNewItems(dontPutItemsOnCircles),
          turnsUntilEvent: gameState.value!.turnsUntilEvent - 1,
        }
      : {}),
    dieRoll: null,
    ...(randomEvent
      ? { alert: gameState.value!.turnsUntilEvent === 0 && nextTurn ? { id: randomEvent } : null }
      : {}),
  }
}
