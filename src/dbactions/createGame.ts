import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { mapList } from '../maps/mapList'
import { GameState } from '../types/gameTypes'
import { zoomIntoCircle } from '../utils/zoomIntoCircle'
import { homePageMap } from '../maps/home'
import { arcadeEventSelection, textOpacity } from '../signals/signals'
import { sleep } from '../utils/sleep'
import { createGameItems } from '../items'

export async function createGame(mapNum: number) {
  const gameState = mapList[mapNum].gameState
  // items/events may have changed since map was parsed
  const gameStateWithItems: GameState = {
    ...gameState,
    items: createGameItems(),
    eventsEnabled: arcadeEventSelection.value,
  }
  const gameId = await addDoc(collection(db, 'games'), gameStateWithItems)
  textOpacity.value = 0
  await zoomIntoCircle({ circle: homePageMap[mapNum] })
  await sleep(500)
  window.location.search = `?game=${gameId.id}`
}
