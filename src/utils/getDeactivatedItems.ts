import { gameState } from '../signals/signals'
import { objectMap } from './objectMap'

export function getDeactivatedItems() {
  return objectMap(gameState.value!.items, item => ({
    ...item,
    isActive: false,
  }))
}
