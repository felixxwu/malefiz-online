import { store } from '../data/store'
import { playAiIfApplicable } from '../localgame/playAiIfApplicable'
import { mapToHashTable } from '../maps/mapToHashTable'
import { renderOverlay } from '../overlay'
import { drawDie } from '../renderers/drawDie'
import { drawHud } from '../renderers/drawHud'
import { drawPlayers } from '../renderers/drawPlayers'
import { GameState } from '../types/gameTypes'

export function onGameStateChange(gameState: GameState | null) {
  if (!gameState) return

  drawPlayers(gameState)
  drawHud()
  drawDie()
  renderOverlay()
  store.gameStateMapHashed = mapToHashTable(gameState.map)
  playAiIfApplicable()
}
