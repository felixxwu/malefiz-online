import { drawMap } from './createMap'
import { addEventListeners } from './eventListeners'
import { resize } from './resize'
import './firebase'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { GameState } from './game'
import { store } from './store'
import { renderOverlay } from './overlay'
import { fitToScreen, zoomIntoCircle } from './zoom'

resize()
addEventListeners()
renderOverlay()
drawMap(store.currentMap)
zoomIntoCircle(store.currentMap[0], { transition: 0 })

const urlParams = new URLSearchParams(window.location.search)
const gameId = urlParams.get('game')
store.gameId = gameId
if (gameId) {
  onSnapshot(doc(db, 'games', gameId), doc => {
    store.gameState = doc.data() as GameState
    store.currentMap = store.gameState.map
    setTimeout(() => {
      fitToScreen(store.currentMap, { transition: 1000, translateDelay: 800 })
    }, 200)
  })
} else {
  setTimeout(() => {
    fitToScreen(store.currentMap, { transition: 1000, translateDelay: 800 })
  }, 200)
}
