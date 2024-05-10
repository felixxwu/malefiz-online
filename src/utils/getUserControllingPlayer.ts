import { PlayerID } from '../types/gameTypes'
import { getUsers } from './getUsers'

export function getUserControllingPlayer(playerId: PlayerID) {
  const users = getUsers()
  return users.find(u => u.playerToControl === playerId)
}
