import { sleep } from '../utils/sleep'
import { gameState, lastDieRoll } from '../signals/signals'
import { consts } from '../config/consts'
import { updateGame } from './updateGame'
import { getNextTurnGameState } from '../signals/queries/getNextTurnGameState'
import { playMovePiece } from '../audio/playMovePiece'
import { getPathDistance } from '../utils/getPathDistance'

export async function movePiece(pieceId: string, circleId: string) {
  playMovePiece()

  // Get current position of the piece
  const currentPlayer = gameState.value!.players.find(p => p.id === gameState.value!.playerTurn)!
  const currentPosition = currentPlayer.positions.find(pos => pos.pieceId === pieceId)!
  const distance = getPathDistance(currentPosition.circleId, circleId)

  await updateGame({
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
          },
        }
      } else {
        return player
      }
    }),
    ...getNextTurnGameState(lastDieRoll.value !== 6, [circleId]),
  })

  await sleep(consts.playerTransition)
}
