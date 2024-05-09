import { evCache, mouseDownData } from '../../../signals'

export function handlePointerUp(event: PointerEvent) {
  mouseDownData.value = null
  // translateGroup!.style.pointerEvents = 'all'

  // Remove this event from the target's cache
  const index = evCache.value.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
  evCache.value.splice(index, 1)
}
