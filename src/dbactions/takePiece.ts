import { consts } from '../config/consts'
import { gameState, lastDieRoll, map } from '../signals/signals'
import { getNewItems } from '../utils/getNewItems'
import { getNextPlayer } from '../utils/playerTurns'
import { updateGame } from './updateGame'

export async function takePiece(pieceId: string, circleId: string, opponentPieceId: string) {
  await updateGame({
    players: gameState.value!.players.map(player => {
      if (gameState.value!.playerTurn === player.id) {
        // move current player piece
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
          aiTemper: Math.max(0, player.aiTemper - consts.temperDecrease),
        }
      } else if (player.positions.some(pos => pos.pieceId === opponentPieceId)) {
        // move opponent piece to start
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== opponentPieceId)
            .concat({
              pieceId: opponentPieceId,
              circleId: map.value.find(circle => circle.start === player.id)!.id,
            }),
          aiTemper: player.aiTemper + consts.temperIncrease,
        }
      } else {
        return player
      }
    }),
    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    items: getNewItems([circleId]),
    dieRoll: null,
  })
}
