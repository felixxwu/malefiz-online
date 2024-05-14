import { consts } from '../config/consts'
import { gameState } from '../signals/signals'
import { GameState } from '../types/gameTypes'
import { getNewItems } from './getNewItems'
import { getNextPlayer } from './playerTurns'

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
          turnsUntilEvent:
            gameState.value!.turnsUntilEvent === 0
              ? consts.eventInterval
              : gameState.value!.turnsUntilEvent - 1,
        }
      : {}),
    dieRoll: null,
    ...(randomEvent
      ? { alert: gameState.value!.turnsUntilEvent === 0 ? { id: randomEvent } : null }
      : {}),
  }
}
