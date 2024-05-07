import { zoomGroup } from '../utils/getSvgGroup'

export function addBgClickListener() {
  zoomGroup!.addEventListener('click', e => {
    e.stopPropagation()
  })
}
