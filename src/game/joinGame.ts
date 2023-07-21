import { store } from '../data/store'
import { GameState } from '../types/gameTypes'
import { updateGameState } from '../utils/updateGameState'
import { players } from '../maps/parseMap'

// assumes we have game in store
export async function joinGame(playerId: string, gameId?: string) {
  if (!store.gameState) return

  if (gameId) {
    store.gameId = gameId
  }

  const newGameState = (gameState: GameState): Partial<GameState> => ({
    users: gameState.users
      .filter((user: any) => user.id !== store.userId)
      .concat({
        id: store.userId!,
        playerToControl: playerId,
        lastOnline: Date.now(),
        isAI: false,
        isHost: playerId === players[0].id,
      }),
  })

  await updateGameState(newGameState)
}
