import { playWin } from '../../audio/playWin'
import { circleHovered, gameOver, gameState, gameStateHashTable } from '../signals'
import { zoomIntoCircle } from './zoomIntoCircle'

export function checkForGameOver() {
  setTimeout(() => {
    circleHovered.value = null
    for (const key in gameStateHashTable.value) {
      const pos = gameStateHashTable.value[key]
      if (pos.circle?.finish && pos.pieces) {
        const playerName = gameState.value!.players.find(
          player => player.id === pos.pieces![0].playerId
        )!.name
        gameOver.value = playerName
        zoomIntoCircle({ circle: pos.circle, zoomDelay: 500 })
        playWin()
      }
    }
  })
}
