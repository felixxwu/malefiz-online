import { keyframes, styled } from 'goober'
import { Circle } from '../../../types/mapTypes'
import { getMyPlayer } from '../../../signals/queries/getMyPlayer'

export function MoveDestination(props: { circle: Circle }) {
  const { x, y } = { x: props.circle.position.x * 100, y: props.circle.position.y * 100 }
  const myColour = getMyPlayer()!.colour

  return <CircleSVG cx={x} cy={y} r='10' style={{ fill: myColour }} />
}

const flashing = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const CircleSVG = styled('circle')`
  animation: ${flashing} 1s infinite ease;
`
