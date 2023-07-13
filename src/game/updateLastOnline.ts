import { doc, runTransaction } from 'firebase/firestore'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { GameState } from '../types/gameTypes'

export function updateLastOnline(time: number) {
  if (!store.gameState || !store.gameId) return
  runTransaction(db, async transaction => {
    const document = await transaction.get(doc(db, 'games', store.gameId!))
    const data = document.data() as GameState
    if (!data) return
    const newGameStateUsers: Partial<GameState> = {
      users: data.users.map(user => {
        if (user.id === store.userId) {
          return { ...user, lastOnline: time }
        }
        return user
      }),
    }
    transaction.update(doc(db, 'games', store.gameId!), newGameStateUsers)
  })
}
