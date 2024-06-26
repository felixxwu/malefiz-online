import { gameState } from '../signals'
import { getUsers } from '../queries/getUsers'
import { myPlayerId } from './myPlayerId'

export function isUserHost() {
  const users = getUsers()
  users.sort((a, b) => a.playerToControl.localeCompare(b.playerToControl))
  const humanPlayers = users.map(u =>
    gameState.value!.players.find(p => p.id === u.playerToControl)
  )
  const myIndex = humanPlayers.findIndex(p => p?.id === myPlayerId.value)
  return myIndex === 0
}
