import { drawMap } from './renderers/drawMap'
import { addEventListeners } from './listeners'
import { resize } from './utils/resize'
import './config/firebase'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import { GameState } from './game'
import { store } from './data/store'
import { renderOverlay } from './overlay'
import { fitToScreen, zoomIntoCircle } from './utils/zoom'
import { colour1 } from './data/cssVars'

let firstDataLoad = true

resize()
addEventListeners()
renderOverlay()
drawMap(store.currentMap)
zoomIntoCircle(store.currentMap[0], { transition: 0 })

setTimeout(() => {
  document.body.style.backgroundColor = colour1.value
}, 1)

const urlParams = new URLSearchParams(window.location.search)
const gameId = urlParams.get('game')
store.gameId = gameId
if (gameId) {
  onSnapshot(doc(db, 'games', gameId), doc => {
    store.gameState = doc.data() as GameState
    store.currentMap = store.gameState.map
    if (firstDataLoad) {
      firstDataLoad = false
      setTimeout(() => {
        fitToScreen(store.currentMap, { transition: 1000, translateDelay: 800 })
      }, 100)
    }
  })
} else {
  setTimeout(() => {
    fitToScreen(store.currentMap, { transition: 1000, translateDelay: 800 })
    store.textOpacity = 1
  }, 100)
}
