import { OverlayButtons } from './buttons'
import { Menu } from './menu'

export function drawOverlay() {
  const overlay = document.getElementById('overlay')!
  overlay.innerHTML = ''
  overlay.appendChild(OverlayButtons())
  overlay.appendChild(Menu())
}
