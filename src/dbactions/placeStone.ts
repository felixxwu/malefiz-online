import { gameState } from '../signals/signals'
import { getNextTurnGameState } from '../signals/queries/getNextTurnGameState'
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

    ...getNextTurnGameState(true, [clickedCircleId]),
  })
}
