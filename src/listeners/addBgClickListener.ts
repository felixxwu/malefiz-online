import { store } from '../data/store'
import { svg, zoomGroup } from '../utils/getSvgGroup'

export function addBgClickListener() {
  svg!.addEventListener('click', () => {
    store.pieceSelected = null
  })
  zoomGroup!.addEventListener('click', e => {
    e.stopPropagation()
  })
}
