import { store } from '../data/store'
import { showJoinButton } from '../game/showJoinButton'
import { GameState } from '../types/gameTypes'

export function updatePlayerStyles(gameState: GameState) {
  for (const player of gameState.players) {
    if (player.isAI) continue
    for (const position of player.positions) {
      const pieceEl = document.getElementById('p' + position.pieceId)
      if (pieceEl) {
        pieceEl.style.opacity = store.onlinePlayers.includes(player.id) ? '1' : '0.3'
      }
    }
    const joinButtonEl = document.getElementById('joinButton' + player.id)
    if (joinButtonEl) {
      joinButtonEl.style.display = showJoinButton(player.id) ? 'block' : 'none'
    }
  }
}
