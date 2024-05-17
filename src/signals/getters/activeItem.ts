import { itemDefs } from '../../items'
import { gameState } from '../signals'
import { objectToArray } from '../../utils/objectToArray'
import { computed } from '@preact/signals'

export const activeItem = computed(() => {
  if (!gameState.value) return null

  const activeItem = objectToArray(gameState.value.items).find(item => item.value.isActive)
  if (!activeItem) return null

  return itemDefs[activeItem.key]
})
