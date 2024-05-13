import { consts } from '../config/consts'
import { ItemName } from '../items'
import { gameState } from '../signals/signals'
import { updateGame } from './updateGame'

export async function takeItem(itemName: ItemName, pieceId: string, circleId: string) {
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
        positions: gameState.value!.items[itemName].positions.filter(
          pos => pos.circleId !== circleId
        ),
      },
    },
    dieRoll: null,
  })
}
