import { store } from '../data/store'
import { updateGameState } from '../utils/updateGameState'

export function updateLastOnline(time: number) {
  if (!store.gameState || !store.gameId) return
  updateGameState(gameState => ({
    users: gameState.users.map(user => {
      if (user.id === store.userId) {
        return { ...user, lastOnline: time }
      }
      return user
    }),
  }))
}
