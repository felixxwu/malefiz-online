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
import { leaveGame } from '../dbactions/leaveGame'
import { events } from '../events'
import { sleep } from '../utils/sleep'
import { updateGame } from '../dbactions/updateGame'
import { ItemName, itemDefs } from '../items'
import { isUserHost } from '../utils/playAiIfApplicable'

export function onGameStateChange() {
  console.info(`gameState.value`, gameState.value)

  resolveMultipleUsersPerPlayer()
  saveDieRoll()
  checkForGameOver()
  activateItem()
  activateEvent()
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

function saveDieRoll() {
  if (gameState.value && gameState.value!.dieRoll !== null) {
    lastDieRoll.value = gameState.value!.dieRoll
  }
}

function checkForGameOver() {
  setTimeout(() => {
    circleHovered.value = null
    for (const key in gameStateHashTable.value) {
      const pos = gameStateHashTable.value[key]
      if (pos.circle?.finish && pos.pieces) {
        const playerName = gameState.value!.players.find(
          player => player.id === pos.pieces![0].playerId
        )!.name
        gameOver.value = playerName
        zoomIntoCircle({ circle: pos.circle, zoomDelay: 500 })
      }
    }
  })
}

async function activateItem() {
  if (!gameState.value) return
  const item = itemDefs[gameState.value!.alert?.id as ItemName]
  if (item) {
    const meta = gameState.value!.alert!.meta
    await sleep(2800)
    await updateGame({ alert: null })
    item.onPickup(meta.pieceId, meta.circleId)
  }
}

async function activateEvent() {
  if (!gameState.value) return
  const event = events.find(event => event.name === gameState.value!.alert?.id)
  if (event && isUserHost()) {
    await sleep(3000)
    await updateGame({ alert: null })
    event.onActivate()
  }
}
