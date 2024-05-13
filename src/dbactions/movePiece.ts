import { getNextPlayer } from '../utils/playerTurns'
import { sleep } from '../utils/sleep'
import { gameState, lastDieRoll } from '../signals/signals'
import { consts } from '../config/consts'
import { updateGame } from './updateGame'
import { getNewItems } from '../utils/getNewItems'

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
    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    items: getNewItems([circleId]),
    dieRoll: null,
  })

  await sleep(consts.playerTransition)
}
