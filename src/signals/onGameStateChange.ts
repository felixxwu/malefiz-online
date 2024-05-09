import { getUsers } from '../utils/getUsers'
import { zoomIntoCircle } from '../utils/zoomIntoCircle'
import {
  gameState,
  lastDieRoll,
  circleHovered,
  gameStateHashTable,
  gameOver,
  userId,
} from './signals'
import { leaveGame } from '../utils/leaveGame'

export function onGameStateChange() {
  resolveMultipleUsersPerPlayer()
  if (gameState.value && gameState.value!.dieRoll !== null) {
    lastDieRoll.value = gameState.value!.dieRoll
  }
  setTimeout(() => {
    circleHovered.value = null
    for (const key in gameStateHashTable.value) {
      const pos = gameStateHashTable.value[key]
      if (pos.circle?.finish && pos.pieces) {
        const playerName = gameState.value!.players.find(
          player => player.id === pos.pieces![0].playerId
        )!.name
        gameOver.value = playerName
        zoomIntoCircle({ circle: pos.circle })
      }
    }
  })
}

function resolveMultipleUsersPerPlayer() {
  if (!gameState.value) return
  const users = getUsers()
  const players = gameState.value.players
  for (const player of players) {
    const usersForPlayer = users.filter(user => user.playerToControl === player.id)
    if (usersForPlayer.length > 1) {
      usersForPlayer.sort((a, b) => a.timeJoined - b.timeJoined)
      const myUserIndex = usersForPlayer.findIndex(user => user.userId === `user${userId.value}`)
      // i'm not the first to join
      if (myUserIndex !== 0) {
        leaveGame()
      }
    }
  }
}
