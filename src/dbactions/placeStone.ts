import { gameState, lastDieRoll } from '../signals/signals'
import { getNewItems } from '../utils/getNewItems'
import { getNextPlayer } from '../utils/playerTurns'
import { updateGame } from './updateGame'

export async function placeStone(clickedCircleId: string) {
  await updateGame({
    stones: gameState.value!.stones.map(stone => {
      if (stone.circleId === null) {
        return {
          ...stone,
          circleId: clickedCircleId,
        }
      } else {
        return stone
      }
    }),

    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    items: getNewItems([clickedCircleId]),
    dieRoll: null,
  })
}
