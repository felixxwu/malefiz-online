import { zoomIntoCircle } from '../utils/zoomIntoCircle'
import { gameState, lastDieRoll, circleHovered, gameStateHashTable, gameOver } from './signals'

export function onGameStateChange() {
  if (gameState.value && gameState.value!.dieRoll !== null) {
    lastDieRoll.value = gameState.value!.dieRoll
  }
  setTimeout(() => {
    circleHovered.value = null
    for (const key in gameStateHashTable.value) {
      const pos = gameStateHashTable.value[key]
      if (pos.circle?.finish && pos.pieces) {
        const playerName = gameState.value!.players.find(
          player => player.id === pos.pieces![0].playerId
        )!.name
        gameOver.value = playerName
        zoomIntoCircle({ circle: pos.circle })
      }
    }
  })
}
