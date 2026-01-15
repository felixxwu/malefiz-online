import { gameState, lastDieRoll } from '../signals/signals'
import { getNextTurnGameState } from '../signals/queries/getNextTurnGameState'
import { updateGame } from './updateGame'
import { objectMap } from '../utils/objectMap'
import { objectToArray } from '../utils/objectToArray'
import { playStonePlace } from '../audio/playStonePlace'
import { GameState } from '../types/gameTypes'

export async function placeStone(
  clickedCircleId: string,
  additionalGameState?: Partial<GameState>
) {
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

    ...getNextTurnGameState(lastDieRoll.value !== 6, [clickedCircleId]),
    ...additionalGameState,
  }

  if (itemAtCircle) {
    // Merge item position updates with any items updates from additionalGameState
    const baseItems = additionalGameState?.items || gameState.value!.items
    newGameState.items = objectMap(baseItems, (item, key) =>
      key === itemAtCircle.key
        ? {
            ...item,
            positions: item.positions.filter(pos => pos.circleId !== clickedCircleId),
          }
        : item
    )
  }

  playStonePlace()

  await updateGame(newGameState)
}
