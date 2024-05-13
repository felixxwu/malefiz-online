import { Item } from '.'
import { placeStone } from '../dbactions/placeStone'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable } from '../signals/signals'
import { AI1 } from '../utils/ai'
import { getLegalStonePlacements } from '../utils/legalMoves'
import { polygonToXY } from '../utils/polygonToXY'

export const StoneMove = {
  name: 'Stone Move',
  colour: '#ddd',
  icon: () => (
    <polygon
      style={{
        stroke: 'black',
        strokeWidth: '3',
        fill: 'white',
        strokeLinejoin: 'round',
      }}
      points={[0, 1, 2, 3, 4, 5, 6, 7]
        .map(i => polygonToXY(i, 8, 10))
        .map(({ x, y }) => `${x},${y}`)
        .join(' ')}
    />
  ),
  actionWhenActive: {
    onClick: () => {},
    text: 'Move one stone somewhere else',
    showDie: false,
    clickable: false,
  },
  onCircleClickWhenActive: (circleId: string) => {
    if (gameState.value!.stones.find(stone => stone.circleId === null)) {
      placeStone(circleId)
      return
    }

    if (gameStateHashTable.value![circleId].stone) {
      updateGame({
        stones: gameState.value!.stones.map(stone => {
          if (stone.circleId === circleId) {
            return {
              ...stone,
              circleId: null,
            }
          } else {
            return stone
          }
        }),
      })
    }
  },
  onPickup: () => {},
  aiAction: () => {
    if (gameState.value!.stones.some(stone => stone.circleId === null)) {
      const legalStonePlacements = getLegalStonePlacements()
      const placement = AI1.getBestStonePlacement(legalStonePlacements)
      placeStone(placement.id)
      return
    }

    const stoneToPickup = AI1.getBestStoneToPickUp()
    updateGame({
      stones: gameState.value!.stones.map(stone => {
        if (stone.circleId === stoneToPickup?.id) {
          return {
            ...stone,
            circleId: null,
          }
        } else {
          return stone
        }
      }),
    })
  },
} as const satisfies Item
