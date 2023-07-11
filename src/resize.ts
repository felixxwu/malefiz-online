import { svg } from './getSVG'

export function resize() {
  svg!.style.width = window.innerWidth + 'px'
  svg!.style.height = window.innerHeight + 'px'
}
