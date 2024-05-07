import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { mapList } from '../maps/mapList'
import { introSequence } from '../init'
import { zoomIntoCircle } from '../utils/zoom'
import { sleep } from '../utils/sleep'

export async function startMapSelection() {
  store.mapSelectionScreen = mapList[0]
  introSequence()
}

export async function startPlayerSetup() {
  zoomIntoCircle({ transition: 1000 })
  store.textOpacity = 0
  await sleep(800)
  store.playerSetupMenu = true
}

export async function createGame() {
  const selectedMap = store.mapSelectionScreen!
  store.textOpacity = 0
  const gameId = await addDoc(collection(db, 'games'), selectedMap)
  window.location.search = `?game=${gameId.id}`
}
