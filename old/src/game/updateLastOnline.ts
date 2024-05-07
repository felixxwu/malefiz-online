import { store } from '../data/store'
import { updateGameState } from '../utils/updateGameState'

export function updateLastOnline(time: number) {
  if (!store.gameState) return
  if (store.localGame) return
  if (!store.gameId) return
  updateGameState(
    gameState => ({
      users: gameState.users.map(user => {
        if (user.id === store.userId) {
          return { ...user, lastOnline: time }
        }
        return user
      }),
    }),
    true
  )
}

export function checkForOnlinePlayers() {
  if (!store.gameState) return
  if (store.localGame) return
  const onlineUsers = store.gameState.users.filter(user => user.lastOnline > Date.now() - 10000)
  store.onlinePlayers = onlineUsers.map(user => user.playerToControl)
}
