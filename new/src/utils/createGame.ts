import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { mapList } from '../maps/mapList'
import { GameState } from '../types/gameTypes'

export async function createGame(mapNum: number) {
  const gameState: GameState = mapList[mapNum].gameState
  const gameId = await addDoc(collection(db, 'games'), gameState)
  window.location.search = `?game=${gameId.id}`
}
