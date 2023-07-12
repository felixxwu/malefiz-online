import { drawMap, map1 } from './createMap'
import { addEventListeners } from './eventListeners'
import { resize } from './resize'
import './firebase'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { GameState, createGame } from './game'
import { store } from './store'

onSnapshot(doc(db, 'games', '1'), doc => {
  store.gameState = doc.data() as GameState
})

resize()
addEventListeners()
drawMap(map1)
// createGame()
