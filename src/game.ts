import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import { map1 } from './maps/map1'
import { db } from './config/firebase'
import { store } from './data/store'
import { zoomIntoCircle } from './utils/zoom'
import { GameState } from './types/gameTypes'

export async function createGame() {
  const gameId = await addDoc(collection(db, 'games'), map1)
  window.location.search = `?game=${gameId.id}`
}

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
  }, 5000 + Math.random() * 1000)

  // check for offline players
  setInterval(() => {
    if (!store.gameState) return
    const onlineUsers = store.gameState.users.filter(user => user.lastOnline > Date.now() - 10000)
    store.onlinePlayers = onlineUsers.map(user => user.playerToControl)
  }, 2000)
}

export function leaveGame() {
  store.menuOpen = false
  updateLastOnline(0)
  zoomIntoCircle(store.currentMap[0], { transition: 1000 })
  setTimeout(() => {
    window.location.href = '/'
  }, 1000)
}

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
