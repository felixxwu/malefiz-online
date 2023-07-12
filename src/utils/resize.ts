import { svg } from './getSvgGroup'

export function resize() {
  svg!.style.width = window.innerWidth + 'px'
  svg!.style.height = window.innerHeight + 'px'
}
