import { consts } from '../config/consts'
import { gameState } from '../signals/signals'
import { sleep } from '../utils/sleep'
import { updateGame } from './updateGame'

export async function takeStone(pieceId: string, circleId: string) {
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
    stones: gameState.value!.stones.map(stone => {
      if (stone.circleId === circleId) {
        return {
          ...stone,
          circleId: null,
        }
      } else {
        return stone
      }
    }),
    dieRoll: null,
  })

  await sleep(consts.playerTransition)
}
