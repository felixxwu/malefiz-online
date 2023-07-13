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

export function getUserData(): User {
  return store.gameState!.users.find(user => user.id === store.userId)!
}
