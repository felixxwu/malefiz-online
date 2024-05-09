import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { GameState } from '../types/gameTypes'
import { gameId } from './gameId'
import { waitingForServer } from '../signals/signals'

export async function updateGame(update: Partial<GameState>) {
  if (!gameId) return
  waitingForServer.value = true
  await updateDoc(doc(db, 'games', gameId), update)
  waitingForServer.value = false
}
