import { gameState, lastDieRoll, map } from '../signals'
import { getNextPlayer } from './playerTurns'
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
        }
      } else {
        return player
      }
    }),
    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    dieRoll: null,
  })
}
