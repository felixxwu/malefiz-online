import { store } from '../data/store'
import { playAiIfApplicable } from '../localgame/playAiIfApplicable'
import { mapToHashTable, stoneToHashTable } from '../maps/mapToHashTable'
import { drawOverlay } from '../overlay'
import { drawDie } from '../renderers/drawDie'
import { drawHud } from '../renderers/drawHud'
import { drawPlayers } from '../renderers/drawPlayers'
import { drawStones } from '../renderers/drawStones'
import { GameState } from '../types/gameTypes'
import { isMyTurn } from './playerTurns'
import { rollDie } from './rollDie'

export function onGameStateChange(gameState: GameState | null) {
  if (!gameState) return

  if (gameState.stones.some(stone => stone.circleId === null) && isMyTurn()) {
    store.actionButton = { text: 'Place Stone', flashing: true }
  } else if (gameState!.dieRoll === null && isMyTurn()) {
    store.actionButton = { text: 'Roll', onClick: () => rollDie(), flashing: true }
  } else {
    store.actionButton === null
  }

  drawPlayers(gameState)
  drawStones(gameState)
  drawHud()
  drawDie()
  drawOverlay()
  store.gameStateMapHashed = mapToHashTable(gameState.map)
  store.gameStateStoneHashed = stoneToHashTable(gameState)
  playAiIfApplicable()
}
