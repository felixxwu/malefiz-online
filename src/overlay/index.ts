import { createButtons } from './buttons'
import { createMenu } from './menu'

export function renderOverlay() {
  document.body.appendChild(createButtons())
  document.body.appendChild(createMenu())
}
