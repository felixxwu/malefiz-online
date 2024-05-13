import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { gameId } from '../utils/gameId'
import { userId } from '../signals/signals'

export async function leaveGame() {
  await updateDoc(doc(db, 'games', gameId!), {
    [`user${userId.value}`]: deleteField(),
  })
}
