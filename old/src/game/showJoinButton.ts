import { store } from '../data/store'
import { getUserData } from '../data/userId'

export function showJoinButton(playerId: string) {
  const onlinePlayers = store.onlinePlayers
  const userData = getUserData()
  if (store.mapSelectionScreen) return false
  if (userData) return false
  if (onlinePlayers.includes(playerId)) return false
  return true
}
