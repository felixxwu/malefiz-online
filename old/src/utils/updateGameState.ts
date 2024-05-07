import { doc, runTransaction } from 'firebase/firestore'
import { store } from '../data/store'
import { GameState } from '../types/gameTypes'
import { db } from '../config/firebase'
import { currentPlayer } from '../data/userId'
import hash from 'object-hash'

export async function updateGameState(
  getNewGameState: (gameState: GameState) => Partial<GameState>,
  isUpdateOnlineTimeOnly = false
) {
  if (store.localGame) {
    const newGameState = getNewGameState(store.gameState!)
    store.gameState = {
      ...store.gameState!,
      ...newGameState,
      gameStateHash: createGameStateHash({ ...store.gameState!, ...newGameState }),
    }
  } else {
    if (!isUpdateOnlineTimeOnly) {
      store.waitingForServer = true
      store.actionButton = { text: 'Waiting for server...', flashing: false }
    }

    await runTransaction(db, async transaction => {
      const document = await transaction.get(doc(db, 'games', store.gameId!))
      const oldGameState = document.data() as GameState
      if (!oldGameState) return
      if (oldGameState.playerTurn !== currentPlayer().id) return
      const newGameState = getNewGameState(oldGameState)
      transaction.update(doc(db, 'games', store.gameId!), {
        ...newGameState,
        gameStateHash: createGameStateHash({ ...oldGameState, ...newGameState }),
      })
    })

    if (!isUpdateOnlineTimeOnly) {
      store.waitingForServer = false
      store.actionButton = null
    }
  }
}

function createGameStateHash(gameState: GameState) {
  const gameStateWithoutUserTimestamps: GameState = {
    ...gameState,
    users: gameState.users.map(user => ({
      ...user,
      lastOnline: 0,
    })),
    gameStateHash: '',
  }
  return hash(gameStateWithoutUserTimestamps)
}
