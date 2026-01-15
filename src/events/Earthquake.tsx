import { keyframes, styled } from 'goober'
import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState } from '../signals/signals'
import { getLegalStonePlacements } from '../signals/queries/legalMoves'
import { EventAlert } from './EventAlert'
import { consts } from '../config/consts'
import { Stone } from '../components/MapRenderer/StoneGroup/Stone'
import { objectMap } from '../utils/objectMap'
import { objectToArray } from '../utils/objectToArray'

export const Earthquake = {
  name: 'Earthquake',
  description: 'Causes 3 stones to move randomly on the board.',
  alert: () => (
    <EventAlert event={Earthquake}>
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
        <Stone1>
          <Stone />
        </Stone1>
        <Stone2>
          <Stone />
        </Stone2>
      </Svg>
    </EventAlert>
  ),
  onActivate: async () => {
    if (!gameState.value) return

    let updatedStones = [...gameState.value.stones]
    let updatedItems = { ...gameState.value.items }
    const circlesWithItems = new Set<string>()

    // Move 3 stones randomly
    for (let i = 0; i < 3; i++) {
      const legalIds = getLegalStonePlacements()
      if (legalIds.length === 0) break

      const randomStoneNum = Math.floor(Math.random() * updatedStones.length)
      const randomNewCircleId = legalIds[Math.floor(Math.random() * legalIds.length)]!.id

      // Update stone position
      updatedStones = updatedStones.map((stone, idx) => {
        if (idx === randomStoneNum) {
          return { ...stone, circleId: randomNewCircleId }
        }
        return stone
      })

      // Track circles that will have stones (to remove items)
      circlesWithItems.add(randomNewCircleId)
    }

    // Remove items from circles where stones were placed
    for (const circleId of circlesWithItems) {
      const itemAtCircle = objectToArray(updatedItems).find(item =>
        item.value.positions.find(pos => pos.circleId === circleId)
      )

      if (itemAtCircle) {
        updatedItems = objectMap(updatedItems, (item, key) =>
          key === itemAtCircle.key
            ? {
                ...item,
                positions: item.positions.filter(pos => pos.circleId !== circleId),
              }
            : item
        )
      }
    }

    await updateGame({
      stones: updatedStones,
      items: updatedItems,
    })
  },
} as const satisfies Event

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(1.5) translateY(50px);
`

const Stone1Keyframe = keyframes`
  0%, 66% {
    transform: translate(-100px, 0);
  }
  100% {
    transform: translate(100px, 0);
  }
  
`

const Stone1 = styled('g')`
  animation: ${Stone1Keyframe} 2s ${consts.customEase};
  animation-fill-mode: forwards;
`

const Stone2Keyframe = keyframes`
  0%, 33% {
    transform: translate(100px, 0);
  }
  66% {
    transform: translate(0px, 0);
  }

`

const Stone2 = styled('g')`
  animation: ${Stone2Keyframe} 2s ${consts.customEase};
  animation-fill-mode: forwards;
`
