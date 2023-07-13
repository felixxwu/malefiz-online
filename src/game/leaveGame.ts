import { store } from '../data/store'
import { zoomIntoCircle } from '../utils/zoom'
import { updateLastOnline } from './updateLastOnline'

export function leaveGame() {
  store.menuOpen = false
  updateLastOnline(0)
  zoomIntoCircle(store.currentMap[0], { transition: 1000 })
  setTimeout(() => {
    window.location.href = '/'
  }, 1000)
}
