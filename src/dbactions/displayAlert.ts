import { Alert } from '../types/gameTypes'
import { updateGame } from './updateGame'
import { gameState } from '../signals/signals'

export async function displayAlert(alert: Alert) {
  // Add alert to the queue
  const currentAlerts = gameState.value?.alerts || []
  await updateGame({ alerts: [...currentAlerts, alert] })
}
