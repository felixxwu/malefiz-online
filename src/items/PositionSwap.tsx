import { Item } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable, lastDieRoll } from '../signals/signals'
import { getNewItems } from '../utils/getNewItems'
import { getMyPlayerId } from '../utils/getUsers'
import { getNextPlayer } from '../utils/playerTurns'
import { sleep } from '../utils/sleep'
import { ItemAction } from './ItemAction'

export const PositionSwap = {
  name: 'Position Swap',
  colour: 'hsl(115, 70%, 60%)',
  icon: () => (
    <path
      d='M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z'
      style={{
        fill: 'black',
        transform: 'translate(-12px, -12px) ',
      }}
    />
  ),
  actionWhenActive: {
    onClick: () => {},
    text: 'Swapping places with a random opponent',
    showDie: false,
    clickable: false,
  },
  onCircleClickWhenActive: null,
  alert: () => <ItemAction title='Position Swap: Swapping places with a random opponent' />,
  onPickup: async (_, circleId) => {
    await sleep(1000)

    const opponents = gameState.value!.players.filter(player => player.id !== getMyPlayerId())
    const validPieces: { circleId: string; playerId: string }[] = []
    for (const opponent of opponents) {
      for (const position of opponent.positions) {
        if (!gameStateHashTable.value[position.circleId].circle?.start) {
          validPieces.push({ circleId: position.circleId, playerId: opponent.id })
        }
      }
    }
    if (validPieces.length === 0) return

    const randomPiece = validPieces[Math.floor(Math.random() * validPieces.length)]
    updateGame({
      players: gameState.value!.players.map(player => {
        if (player.id === getMyPlayerId()) {
          return {
            ...player,
            positions: player.positions.map(position =>
              position.circleId === circleId
                ? {
                    ...position,
                    circleId: randomPiece.circleId,
                  }
                : position
            ),
          }
        } else if (player.id === randomPiece.playerId) {
          return {
            ...player,
            positions: player.positions.map(position =>
              position.circleId === randomPiece.circleId ? { ...position, circleId } : position
            ),
          }
        } else {
          return player
        }
      }),

      ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
      items: getNewItems([circleId]),
      dieRoll: null,
    })
  },
  aiAction: () => {},
} as const satisfies Item
