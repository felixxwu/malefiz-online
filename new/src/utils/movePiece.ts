import { getNextPlayer } from './playerTurns'
import { sleep } from '../utils/sleep'
import { gameState, lastDieRoll } from '../signals'
import { consts } from '../config/consts'
import { updateGame } from './updateGame'

export async function movePiece(pieceId: string, circleId: string) {
  await updateGame({
    players: gameState.value!.players.map(player => {
      if (gameState.value!.playerTurn === player.id) {
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
        }
      } else {
        return player
      }
    }),
    ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
    dieRoll: null,
  })

  await sleep(consts.playerTransition)
}
