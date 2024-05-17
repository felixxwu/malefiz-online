import { userId } from '../signals'
import { getUserFromGameState } from '../queries/getUserFromGameState'
import { computed } from '@preact/signals'

export const myPlayerId = computed(() => {
  return getUserFromGameState(userId.value)?.playerToControl
})
