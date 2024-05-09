export function getDistance(ev1: PointerEvent, ev2: PointerEvent) {
  return Math.sqrt(Math.pow(ev1.clientX - ev2.clientX, 2) + Math.pow(ev1.clientY - ev2.clientY, 2))
}
