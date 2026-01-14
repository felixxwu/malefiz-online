import { gameState } from '../signals/signals'
import { getNextTurnGameState } from '../signals/queries/getNextTurnGameState'
import { updateGame } from './updateGame'
import { objectMap } from '../utils/objectMap'
import { objectToArray } from '../utils/objectToArray'

export async function placeStone(clickedCircleId: string) {
  const itemAtCircle = objectToArray(gameState.value!.items).find(item =>
    item.value.positions.find(pos => pos.circleId === clickedCircleId)
  )

  const newGameState = {
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
  }

  if (itemAtCircle) {
    newGameState.items = objectMap(gameState.value!.items, (item, key) =>
      key === itemAtCircle.key
        ? {
            ...item,
            positions: item.positions.filter(pos => pos.circleId !== clickedCircleId),
          }
        : item
    )
  }

  await updateGame(newGameState)
}
