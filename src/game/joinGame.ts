import { store } from '../data/store'
import { GameState } from '../types/gameTypes'
import { updateLastOnline } from './updateLastOnline'
import { updateGameState } from '../utils/updateGameState'

// assumes we have game in store
export async function joinGame(gameId?: string) {
  if (!store.gameState) return

  if (gameId) {
    store.gameId = gameId
  }

  const gameUsers = store.gameState.users
  const gamePlayers = store.gameState.players
  const freePlayers = gamePlayers.filter(
    player =>
      !gameUsers
        .filter(u => u.id !== store.userId && u.lastOnline > Date.now() - 10000)
        .find(user => user.playerToControl === player.id)
  )

  if (freePlayers.length === 0) return

  const newGameState = (gameState: GameState): Partial<GameState> => ({
    users: gameState.users
      .filter((user: any) => user.id !== store.userId)
      .concat({
        id: store.userId!,
        playerToControl: freePlayers[0].id,
        lastOnline: Date.now(),
        isAI: false,
        isHost: freePlayers.length === gamePlayers.length,
      }),
  })

  await updateGameState(newGameState)

  if (!store.localGame) {
    // keep user online
    setInterval(async () => {
      updateLastOnline(Date.now())
    }, 5000)

    // check for offline players
    setInterval(() => {
      if (!store.gameState) return
      const onlineUsers = store.gameState.users.filter(user => user.lastOnline > Date.now() - 10000)
      store.onlinePlayers = onlineUsers.map(user => user.playerToControl)
    }, 2000)
  }
}
