import { store } from '../data/store'
import { sleep } from '../utils/sleep'
import { zoomIntoCircle } from '../utils/zoom'
import { updateLastOnline } from './updateLastOnline'

export async function leaveGame() {
  store.menuOpen = false
  updateLastOnline(0)
  zoomIntoCircle(store.currentMap[0], { transition: 1000 })
  await sleep(1000)
  window.location.href = '/'
}
