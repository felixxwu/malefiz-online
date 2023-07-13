import { addDoc, collection } from 'firebase/firestore'
import { map1 } from '../maps/map1'
import { db } from '../config/firebase'

export async function createGame() {
  const gameId = await addDoc(collection(db, 'games'), map1)
  window.location.search = `?game=${gameId.id}`
}
