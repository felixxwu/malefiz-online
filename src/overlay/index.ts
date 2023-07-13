import { OverlayButtons } from './buttons'
import { Menu } from './menu'

export function renderOverlay() {
  document.body.appendChild(OverlayButtons())
  document.body.appendChild(Menu())
}
