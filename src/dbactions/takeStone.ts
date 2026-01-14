import { playStonePickup } from '../audio/playStonePickup'
import { consts } from '../config/consts'
import { gameState } from '../signals/signals'
import { sleep } from '../utils/sleep'
import { updateGame } from './updateGame'
import { getPathDistance } from '../utils/getPathDistance'

export async function takeStone(pieceId: string, circleId: string) {
  playStonePickup()

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
            stonesTaken: player.stats.stonesTaken + 1,
          },
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
