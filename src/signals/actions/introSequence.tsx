import { map, started, textOpacity } from '../signals'
import { fitToScreen } from './fitToScreen'
import { zoomIntoCircle } from './zoomIntoCircle'
import { sleep } from '../../utils/sleep'
import { gameId } from '../getters/gameId'

export async function introSequence() {
  await zoomIntoCircle({ transition: 0 })

  if (gameId) {
    await sleep(100)
    await start()
    started.value = true
  } else {
    window.addEventListener(
      'click',
      async (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        await start()
      },
      { once: true }
    )
  }
}

async function start() {
  fitToScreen(map.value, { transition: 1300, translateDelay: 600 })
  await sleep(700)
  textOpacity.value = 1
}
