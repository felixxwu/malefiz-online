import { consts } from '../../../config/consts'
import { currentPlayer } from '../../../utils/currentPlayer'

export function Square() {
  return (
    <rect
      x={0}
      y={0}
      width={100}
      height={100}
      rx={15}
      style={{
        fill: currentPlayer().colour,
        stroke: 'black',
        strokeWidth: `${consts.pathStrokeWidth}px`,
        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0 0 15px)',
      }}
    ></rect>
  )
}
