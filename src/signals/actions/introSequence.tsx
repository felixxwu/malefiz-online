import { map, textOpacity } from '../signals'
import { fitToScreen } from './fitToScreen'
import { zoomIntoCircle } from './zoomIntoCircle'
import { sleep } from '../../utils/sleep'

export async function introSequence() {
  await zoomIntoCircle({ transition: 0 })
  await sleep(100)
  fitToScreen(map.value, { transition: 1300, translateDelay: 600 })
  await sleep(700)
  textOpacity.value = 1
}
