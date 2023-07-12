import { drawMap } from './createMap'
import { addEventListeners } from './eventListeners'
import { resize } from './resize'
import './firebase'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { GameState } from './game'
import { store } from './store'
import { drawMenu } from './menu'
import { renderOverlay } from './overlay'

resize()
addEventListeners()
renderOverlay()

const urlParams = new URLSearchParams(window.location.search)
const gameId = urlParams.get('game')
store.gameId = gameId
if (gameId) {
  onSnapshot(doc(db, 'games', gameId), doc => {
    store.gameState = doc.data() as GameState
    drawMap(store.gameState.map)
  })
} else {
  drawMenu()
}
