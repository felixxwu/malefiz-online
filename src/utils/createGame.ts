import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { mapList } from '../maps/mapList'
import { GameState } from '../types/gameTypes'
import { zoomIntoCircle } from './zoomIntoCircle'
import { homePageMap } from '../maps/home'
import { textOpacity } from '../signals/signals'
import { sleep } from './sleep'

export async function createGame(mapNum: number) {
  const gameState: GameState = mapList[mapNum].gameState
  const gameId = await addDoc(collection(db, 'games'), gameState)
  textOpacity.value = 0
  await zoomIntoCircle({ circle: homePageMap[mapNum] })
  await sleep(500)
  window.location.search = `?game=${gameId.id}`
}
