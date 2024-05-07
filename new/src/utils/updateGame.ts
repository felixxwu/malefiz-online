import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { GameState } from '../types/gameTypes'
import { gameId } from './gameId'

export async function updateGame(update: Partial<GameState>) {
  if (!gameId) return
  await updateDoc(doc(db, 'games', gameId), update)
}
