import { lastDieRoll } from '../signals/signals'
import { GameState } from '../types/gameTypes'
import { getNewItems } from './getNewItems'
import { getNextPlayer } from './playerTurns'

export function getNextTurnGameState(dontPutItemsOnCircles: string[]): Partial<GameState> {
  return {
    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    items: getNewItems(dontPutItemsOnCircles),
    dieRoll: null,
  }
}
