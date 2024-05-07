import { User } from '../types/gameTypes'
import { store } from './store'

export function initUserId() {
  const localStorageUserId = localStorage.getItem('userId')
  if (localStorageUserId === null) {
    const newId = Date.now().toString()
    localStorage.setItem('userId', newId)
    store.userId = newId
  } else {
    store.userId = localStorageUserId
  }
}

export function getUserData(): User | null {
  if (!store.gameState) return null
  return store.gameState.users.find(user => user.id === store.userId)!
}

export function currentPlayer() {
  return store.gameState!.players.find(player => player.id === store.gameState!.playerTurn)!
}
