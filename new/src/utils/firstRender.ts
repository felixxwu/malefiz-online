import { colours } from '../config/colours'
import { map, screenHeight, screenWidth, textOpacity } from '../signals'
import { fitToScreen } from './fitToScreen'
import { sleep } from './sleep'
import { zoomIntoCircle } from './zoomIntoCircle'

export async function firstRender() {
  window.document.body.style.backgroundColor = colours.background

  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
  })

  zoomIntoCircle({ transition: 0 })
  await sleep(100)
  fitToScreen(map.value, { transition: 1300, translateDelay: 600 })
  await sleep(1000)
  textOpacity.value = 1
}
