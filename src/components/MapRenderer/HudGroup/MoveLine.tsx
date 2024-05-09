import { Move } from '../../../types/gameTypes'
import { getMyPlayer } from '../../../utils/getUsers'

export function MoveLine(props: { move: Move }) {
  const myColour = getMyPlayer()!.colour
  const x1 = props.move.from.position.x * 100
  const y1 = props.move.from.position.y * 100
  const x2 = props.move.to.position.x * 100
  const y2 = props.move.to.position.y * 100
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      style={{
        stroke: myColour,
        strokeWidth: '4px',
        strokeLinecap: 'round',
        strokeDasharray: '1,10',
        opacity: '1',
      }}
    ></line>
  )
}
