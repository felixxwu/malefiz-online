import { playItemPickup } from '../audio/playItemPickup'
import { consts } from '../config/consts'
import { ItemName, itemDefs } from '../items'
import { gameState } from '../signals/signals'
import { updateGame } from './updateGame'
import { getPathDistance } from '../utils/getPathDistance'

export async function takeItem(itemName: ItemName, pieceId: string, circleId: string) {
  playItemPickup()

  // Get current position of the piece
  const currentPlayer = gameState.value!.players.find(p => p.id === gameState.value!.playerTurn)!
  const currentPosition = currentPlayer.positions.find(pos => pos.pieceId === pieceId)!
  const distance = getPathDistance(currentPosition.circleId, circleId)

  await updateGame({
    // move piece to item
    players: gameState.value!.players.map(player => {
      if (gameState.value!.playerTurn === player.id) {
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
          aiTemper: Math.max(0, player.aiTemper - consts.temperDecrease),
          stats: {
            ...player.stats,
            distanceMoved: player.stats.distanceMoved + distance,
            itemsTaken: player.stats.itemsTaken + 1,
          },
        }
      } else {
        return player
      }
    }),
    // remove item
    items: {
      ...gameState.value!.items,
      [itemName]: {
        ...gameState.value!.items[itemName],
        isActive: true,
        positions: gameState.value!.items[itemName].positions.filter(
          pos => pos.circleId !== circleId
        ),
      },
    },
    alerts: [...(gameState.value!.alerts || []), { id: itemDefs[itemName].name, meta: { pieceId, circleId } }],
    dieRoll: null,
  })
}
