import { gameState } from '../signals'
import { getMyPlayerId, getUsers } from '../queries/getUsers'

export function isUserHost() {
  const users = getUsers()
  users.sort((a, b) => a.playerToControl.localeCompare(b.playerToControl))
  const humanPlayers = users.map(u =>
    gameState.value!.players.find(p => p.id === u.playerToControl)
  )
  const myIndex = humanPlayers.findIndex(p => p?.id === getMyPlayerId())
  return myIndex === 0
}
