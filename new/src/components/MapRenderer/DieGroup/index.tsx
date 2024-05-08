import { useEffect, useState } from 'preact/hooks'
import { gameState } from '../../../signals'
import { randomOffsetAndRotation } from './randomOffsetAndRotation'
import { styled } from 'goober'
import { Square } from './Square'
import { Dot, dotLayouts } from './Dot'

export function DieGroup() {
  if (!gameState.value?.dieRoll) return null

  const { x, y, rotation } = randomOffsetAndRotation()
  const [transform, setTransform] = useState(`rotate(${rotation}deg) translate(${x}px, ${y}px)`)
  const [transformOrigin, setTransformOrigin] = useState(`${x + 50}px ${y + 50}px`)

  useEffect(() => {
    setTransform(`rotate(${rotation}deg) translate(${x}px, ${y}px)`)
    setTransformOrigin(`${x + 50}px ${y + 50}px`)
  }, [gameState.value])

  return (
    <Group
      onClick={() => {
        const diePit = gameState.value!.diePit
        setTransform(`rotate(0deg) translate(${diePit.x * 100}px, ${diePit.y * 100}px)`)
        setTransformOrigin(`0 0`)
      }}
      style={{
        transform,
        cursor: 'pointer',
        transformOrigin,
        transition: '500ms',
        willChange: 'transform',
      }}
    >
      <Square />
      {dotLayouts[gameState.value!.dieRoll].map(pos => (
        <Dot position={pos} />
      ))}
    </Group>
  )
}

const Group = styled('g')`
  animation: rollDie 1s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: 'translate', 'rotate', 'scale', 'opacity', 'filter', 'transform';

  @keyframes rollDie {
    0% {
      opacity: 0;
      rotate: 360deg;
      filter: blur(10px);
      scale: 5;
      translate: 500px 500px;
    }
    30% {
      opacity: 1;
      filter: blur(0px);
      scale: 1;
    }
    100% {
      opacity: 1;
      rotate: 0deg;
      filter: blur(0px);
      scale: 1;
      translate: 0 0;
    }
  }
`
