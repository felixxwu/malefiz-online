import { gameState } from '../signals'
import { objectMap } from '../../utils/objectMap'

export function getDeactivatedItems() {
  return objectMap(gameState.value!.items, item => ({
    ...item,
    isActive: false,
  }))
}
