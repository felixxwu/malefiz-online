import { store } from '../data/store'
import { joinGame } from '../game/joinGame'
import { introSequence } from '../init'
import { map1 } from '../maps/map1'

export function startLocalGame() {
  store.localGame = true
  store.gameState = map1
  store.currentMap = store.gameState.map
  introSequence()
  joinGame()
}
