import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { GameState } from '../types/gameTypes'
import { gameId } from './gameId'
import { action } from '../signals'

export async function updateGame(update: Partial<GameState>) {
  if (!gameId) return
  action.value = { text: 'Waiting for server...' }
  await updateDoc(doc(db, 'games', gameId), update)
  action.value = null
}
