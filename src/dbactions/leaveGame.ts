import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { gameId } from '../utils/gameId'
import { menuOpen, textOpacity, userId } from '../signals/signals'
import { zoomIntoCircle } from '../utils/zoomIntoCircle'

export async function leaveGame() {
  menuOpen.value = false
  textOpacity.value = 0
  await zoomIntoCircle({ zoomDelay: 300 })
  await updateDoc(doc(db, 'games', gameId!), {
    [`user${userId.value}`]: deleteField(),
  })

  window.location.href = '/'
}
