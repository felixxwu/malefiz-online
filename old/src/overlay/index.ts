import { OverlayButtons } from './buttons'
import { MapSelectionButtons } from './mapSelectionButtons'
import { Menu } from './menu'
import { PlayerSetupMenu } from './playerSetup'
import { WinScreen } from './winScreen'

export function drawOverlay() {
  const overlay = document.getElementById('overlay')!
  overlay.innerHTML = ''
  overlay.appendChild(OverlayButtons())
  overlay.appendChild(Menu())
  overlay.appendChild(WinScreen())
  overlay.appendChild(MapSelectionButtons())
  overlay.appendChild(PlayerSetupMenu())
}
