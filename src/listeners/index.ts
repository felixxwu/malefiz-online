import { svg } from '../utils/getSvgGroup'
import { resize } from '../utils/resize'
import { addBgClickListener } from './addBgClickListener'
import { addKeydownListeners } from './addKeydownListeners'
import { addPointerEventListeners } from './addPointerEventListeners'
import { addWheelEventListeners } from './addWheelEventListeners'
import { beforeunload } from './beforeunload'

export function addEventListeners() {
  window!.addEventListener('resize', resize)
  addPointerEventListeners()
  addWheelEventListeners()
  addKeydownListeners()
  addBgClickListener()
  beforeunload()
  svg!.addEventListener('contextmenu', event => event.preventDefault())
}
