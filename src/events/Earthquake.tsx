import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState } from '../signals/signals'
import { getLegalStonePlacements } from '../utils/legalMoves'
import { EventAlert } from './EventAlert'

export const Earthquake = {
  name: 'Earthquake',
  description: 'Causes 3 stones to move randomly on the board.',
  alert: () => <EventAlert event={Earthquake} />,
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
