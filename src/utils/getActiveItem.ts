import { itemDefs } from '../items'
import { gameState } from '../signals/signals'
import { objectToArray } from './objectToArray'

export function getActiveItem() {
  if (!gameState.value) return null

  const activeItem = objectToArray(gameState.value.items).find(item => item.value.isActive)
  if (!activeItem) return null

  return itemDefs[activeItem.key]
}