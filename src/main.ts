import './config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import { joinGame } from './game/joinGame'
import { GameState } from './types/gameTypes'
import { store } from './data/store'
import { gameId } from './data/gameId'
import { introSequence, setup } from './init'

setup()

if (gameId) {
  let firstDataLoad = true
  onSnapshot(doc(db, 'games', gameId), doc => {
    store.gameState = doc.data() as GameState
    if (firstDataLoad) {
      firstDataLoad = false
      store.currentMap = store.gameState.map
      introSequence()
      joinGame(gameId!)
    }
  })
} else {
  introSequence()
}
