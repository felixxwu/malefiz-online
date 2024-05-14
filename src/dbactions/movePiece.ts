import { sleep } from '../utils/sleep'
import { gameState, lastDieRoll } from '../signals/signals'
import { consts } from '../config/consts'
import { updateGame } from './updateGame'
import { getNextTurnGameState } from '../utils/getNextTurnGameState'

export async function movePiece(pieceId: string, circleId: string) {
  await updateGame({
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
    ...getNextTurnGameState(lastDieRoll.value !== 6, [circleId]),
  })

  await sleep(consts.playerTransition)
}
