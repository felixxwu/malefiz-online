import { styled } from 'goober'
import { Circle } from '../../../types/mapTypes'
import { getMyPlayer } from '../../../utils/getUsers'

export function MoveDestination(props: { circle: Circle }) {
  const { x, y } = { x: props.circle.position.x * 100, y: props.circle.position.y * 100 }
  const myColour = getMyPlayer()!.colour

  return <CircleSVG cx={x} cy={y} r='10' style={{ fill: myColour }} />
}

const CircleSVG = styled('circle')`
  animation: flashing 1s infinite;

  @keyframes flashing {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
