import { keyframes, styled } from 'goober'
import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState } from '../signals/signals'
import { getLegalStonePlacements } from '../utils/legalMoves'
import { EventAlert } from './EventAlert'
import { consts } from '../config/consts'
import { Stone } from '../components/MapRenderer/StoneGroup/Stone'

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
  onActivate: () => {
    if (!gameState.value) return

    for (let i = 0; i < 3; i++) {
      // move one stone randomly
      const legalIds = getLegalStonePlacements()
      const randomStoneNum = Math.floor(Math.random() * gameState.value.stones.length)
      const randomNewCircleId = legalIds[Math.floor(Math.random() * legalIds.length)]!.id
      gameState.value = {
        ...gameState.value,
        stones: gameState.value.stones.map((stone, i) => {
          if (i === randomStoneNum) {
            return { ...stone, circleId: randomNewCircleId }
          }
          return stone
        }),
      }
    }

    updateGame(gameState.value)
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
