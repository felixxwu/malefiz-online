import { store } from '../data/store'
import { svg, zoomGroup } from '../utils/getSvgGroup'

export function addBgClickListener() {
  svg!.addEventListener('click', () => {
    if (store.pieceSelected) {
      store.pieceSelected = null
    }
  })
  zoomGroup!.addEventListener('click', e => {
    e.stopPropagation()
  })
}
