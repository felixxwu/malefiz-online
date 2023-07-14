import { GameState } from '../types/gameTypes'
import { store } from '../data/store'
import { getNextPlayer } from './playerTurns'
import { sleep } from '../utils/sleep'
import { CONSTS } from '../data/consts'
import { updateGameState } from '../utils/updateGameState'

export async function movePiece(pieceId: string, circleId: string) {
  await updateGameState(
    (gameState: GameState): Partial<GameState> => ({
      players: gameState.players.map(player => {
        if (store.gameState!.playerTurn === player.id) {
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
      playerTurn: getNextPlayer(),
      dieRoll: null,
    })
  )

  await sleep(CONSTS.PLAYER_TRANSITION)
}
