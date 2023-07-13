import { doc, runTransaction } from 'firebase/firestore'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { GameState } from '../types/gameTypes'
import { updateLastOnline } from './updateLastOnline'

// assumes we have game in store
export async function joinGame(gameId: string) {
  if (!store.gameState) return

  const gameUsers = store.gameState.users
  const gamePlayers = store.gameState.players
  const freePlayers = gamePlayers.filter(
    player =>
      !gameUsers.filter(u => u.id !== store.userId).find(user => user.playerToControl === player.id)
  )

  if (freePlayers.length === 0) return

  await runTransaction(db, async transaction => {
    const document = await transaction.get(doc(db, 'games', gameId))
    const data = document.data() as GameState
    if (!data) return
    const newGameStateUsers: Partial<GameState> = {
      users: data.users
        .filter((user: any) => user.id !== store.userId)
        .concat({
          id: store.userId!,
          playerToControl: freePlayers[0].id,
          lastOnline: Date.now(),
        }),
    }
    transaction.update(doc(db, 'games', gameId), newGameStateUsers)
  })

  // keep user online
  setInterval(async () => {
    updateLastOnline(Date.now())
  }, 5000)

  // check for offline players
  setInterval(() => {
    if (!store.gameState) return
    const onlineUsers = store.gameState.users.filter(user => user.lastOnline > Date.now() - 10000)
    store.onlinePlayers = onlineUsers.map(user => user.playerToControl)
  }, 2000)
}
