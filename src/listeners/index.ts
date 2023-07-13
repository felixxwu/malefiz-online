import { svg } from '../utils/getSvgGroup'
import { resize } from '../utils/resize'
import { addPointerEventListeners } from './addPointerEventListeners'
import { addWheelEventListeners } from './addWheelEventListeners'
import { beforeunload } from './beforeunload'

export function removeEvent(event: PointerEvent) {
  // Remove this event from the target's cache
  const index = evCache.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
  evCache.splice(index, 1)
}

export function getDistance(ev1: PointerEvent, ev2: PointerEvent) {
  return Math.sqrt(Math.pow(ev1.clientX - ev2.clientX, 2) + Math.pow(ev1.clientY - ev2.clientY, 2))
}

export const evCache: PointerEvent[] = []

export function addEventListeners() {
  window!.addEventListener('resize', resize)

  addPointerEventListeners()
  addWheelEventListeners()
  beforeunload()

  svg!.addEventListener('contextmenu', event => event.preventDefault())
}
