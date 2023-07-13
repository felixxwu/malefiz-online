import './config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import { GameState } from './game'
import { store } from './data/store'
import { gameId } from './data/gameId'
import { introSequence, setup } from './init'

setup()

if (gameId) {
  let firstDataLoad = true
  onSnapshot(doc(db, 'games', gameId), doc => {
    store.gameState = doc.data() as GameState
    store.currentMap = store.gameState.map
    if (firstDataLoad) {
      firstDataLoad = false
      introSequence()
    }
  })
} else {
  introSequence()
}
