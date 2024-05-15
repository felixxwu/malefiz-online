import { keyframes, styled } from 'goober'
import { Item } from '.'
import { placeStone } from '../dbactions/placeStone'
import { updateGame } from '../dbactions/updateGame'
import { customCircleHighlights, gameState, gameStateHashTable } from '../signals/signals'
import { AI1 } from '../utils/ai'
import { getLegalStonePlacements } from '../utils/legalMoves'
import { ItemAlert } from './ItemAlert'
import { consts } from '../config/consts'
import { isMyTurn } from '../utils/playerTurns'
import { Stone } from '../components/MapRenderer/StoneGroup/Stone'

export const StoneMove = {
  name: 'Stone Move',
  description: 'Move a stone anywhere on the board.',
  colour: 'hsl(0, 0%, 85%)',
  icon: () => (
    <g style={{ transform: 'scale(0.4)' }}>
      <Stone />
    </g>
  ),
  actionWhenActive: {
    onClick: () => {},
    text: 'Move a stone',
    showDie: false,
    clickable: false,
  },
  onCircleClickWhenActive: async (circleId: string) => {
    if (!isMyTurn()) return

    if (gameState.value!.stones.find(stone => stone.circleId === null)) {
      const legalStonePlacements = getLegalStonePlacements()

      if (legalStonePlacements.find(circle => circle.id === circleId)) {
        placeStone(circleId)
      }

      return
    }

    if (gameStateHashTable.value![circleId].stone) {
      await updateGame({
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

      customCircleHighlights.value = []
    }
  },
  onPickup: () => {
    if (isMyTurn()) {
      customCircleHighlights.value = gameState.value!.stones.map(stone => stone.circleId!)
    }
  },
  alert: () => (
    <ItemAlert item={StoneMove}>
      <StoneMoveGraphic />
    </ItemAlert>
  ),
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

function StoneMoveGraphic() {
  return (
    <Svg>
      <circle cx='-100' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='0' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='100' cy='0' r={consts.circleRadius} fill='black' />
      <line
        x1='-100'
        y1='0'
        x2='100'
        y2='0'
        stroke='black'
        style={{ strokeWidth: consts.pathStrokeWidth }}
      />
      <StoneGroup>
        <Stone />
      </StoneGroup>
    </Svg>
  )
}

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(1.5) translateY(50px);
`

const stoneAlertMove = keyframes`
  0% {
    transform: translate(-100px, 0px);
  }
  30% {
    transform: translate(-100px, 0px);
  }
  100% {
    transform: translate(100px, 0px);
  }
`

const StoneGroup = styled('g')`
  animation: ${stoneAlertMove} 1s ${consts.customEase};
  animation-fill-mode: forwards;
`
