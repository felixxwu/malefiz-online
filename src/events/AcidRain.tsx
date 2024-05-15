import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable, map } from '../signals/signals'
import { EventAlert } from './EventAlert'

export const AcidRain = {
  name: 'Acid Rain',
  description: 'Send one piece back to the start for each player.',
  alert: () => <EventAlert event={AcidRain} />,
  onActivate: async () => {
    const pieces = gameState.value!.players.map(player => {
      const eligiblePieces = player.positions.filter(
        pos => !gameStateHashTable.value[pos.circleId].circle?.start
      )
      return eligiblePieces[Math.floor(Math.random() * eligiblePieces.length)]
    })
    await updateGame({
      players: gameState.value!.players.map(player => {
        return {
          ...player,
          positions: player.positions.map(pos => {
            if (pieces.find(piece => piece.pieceId === pos.pieceId)) {
              return {
                ...pos,
                circleId: map.value.find(circle => circle.start === player.id)!.id,
              }
            } else {
              return pos
            }
          }),
        }
      }),
    })
  },
} as const satisfies Event
