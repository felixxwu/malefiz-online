import { styled } from 'goober'
import { Dot, dotLayouts } from '../MapRenderer/DieGroup/Dot'
import { Square } from '../MapRenderer/DieGroup/Square'
import { textOpacity } from '../../signals'

export function RandomDie() {
  return (
    <Svg width={200} height={200} opacity={textOpacity.value}>
      <g style={{ transform: 'translate(50px, 50px)' }}>
        <Square />
        {dotLayouts[Math.floor(Math.random() * 6 + 1)].map(pos => (
          <Dot position={pos} />
        ))}
      </g>
    </Svg>
  )
}

const Svg = styled('svg')`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transition: opacity 300ms;
  animation: slideUp 1.5s;

  @keyframes slideUp {
    0% {
      transform: scale(2) translate(-50px, 200px) rotate(-20deg);
    }
    100% {
      transform: scale(2) translate(-50px, 60px) rotate(-20deg);
    }
  }

  transform: scale(2) translate(-50px, 60px) rotate(-20deg);
`
