import {
  evCache,
  mouseDownData,
  pieceDragged,
  pieceSelected,
  svgTranslation,
  svgZoom,
} from '../../../signals/signals'
import { getDistance } from '../../../utils/getDistance'
import { getPieceFromCircle } from '../../../signals/queries/getPieceFromCircle'
import { pieceBelongsToMe } from '../../../signals/queries/pieceBelongsToMe'
import { getCircleFromMousePos } from './utils/getCircleFromMousePos'

export function handlePointerDown(event: PointerEvent) {
  const circle = getCircleFromMousePos(event)
  const piece = circle ? getPieceFromCircle(circle.id) : null
  const myPiece = pieceBelongsToMe(piece)
  if (piece && myPiece && circle) {
    pieceDragged.value = { id: piece, from: circle }
    pieceSelected.value = piece
  }

  evCache.value.push(event)
  if (evCache.value.length === 1) {
    mouseDownData.value = {
      coords: { x: event.clientX, y: event.clientY },
      svgTranslation: { ...svgTranslation.value },
      svgZoom: 1,
      pinchDistance: 0,
    }
  } else {
    mouseDownData.value = {
      coords: mouseDownData.value!.coords,
      svgTranslation: mouseDownData.value!.svgTranslation,
      svgZoom: svgZoom.value,
      pinchDistance: getDistance(evCache.value[0], evCache.value[1]),
    }
  }
}
