import { getUsers } from './queries/getUsers'
import { gameState, lastDieRoll, userId, debugMode } from './signals'
import { leaveGame } from '../dbactions/leaveGame'
import { events } from '../events'
import { sleep } from '../utils/sleep'
import { updateGame } from '../dbactions/updateGame'
import { ItemName, itemDefs } from '../items'
import { isUserHost } from './getters/isUserHost'
import { consts } from '../config/consts'
import { displayAlert } from '../dbactions/displayAlert'
import { checkForGameOver } from './actions/win'

let eventWarningShown = false

export function onGameStateChange() {
  if (debugMode && debugMode.value) {
    console.info(`gameState.value`, gameState.value)
  }

  resolveMultipleUsersPerPlayer()
  saveDieRoll()
  checkForGameOver()
  checkEventWarning()
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

async function checkEventWarning() {
  if (!gameState.value) return
  // Show warning when there's 1 turn left before an event and no alerts are currently showing
  if (
    gameState.value.turnsUntilEvent === 1 &&
    gameState.value.alerts.length === 0 &&
    !eventWarningShown
  ) {
    eventWarningShown = true
    await displayAlert({ id: 'eventWarningAlert' })
  }
  // Reset flag when turnsUntilEvent changes (event happened or countdown reset)
  if (gameState.value.turnsUntilEvent !== 1) {
    eventWarningShown = false
  }
}

async function activateItem() {
  if (!gameState.value) return
  const currentAlert = gameState.value!.alerts?.[0]
  const item = itemDefs[currentAlert?.id as ItemName]
  if (item && currentAlert?.meta) {
    const meta = currentAlert.meta
    await sleep(2800)
    // Alert will be removed by frontend after display
    item.onPickup(meta.pieceId, meta.circleId)
  }
}

async function activateEvent() {
  if (!gameState.value) return
  const currentAlert = gameState.value!.alerts?.[0]
  const event = events.find(event => event.name === currentAlert?.id)
  if (event && isUserHost()) {
    await sleep(4000)
    // Alert will be removed by frontend after display
    await updateGame({
      turnsUntilEvent: consts.eventInterval,
    })
    event?.onActivate()
  }
}
