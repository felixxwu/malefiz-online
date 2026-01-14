import { useRef, useState, type Dispatch } from 'preact/hooks'
import { gameState } from '../../../signals/signals'
import { randomOffsetAndRotation } from './randomOffsetAndRotation'
import { keyframes, styled } from 'goober'
import { Square } from './Square'
import { Dot, dotLayouts } from './Dot'
import type { SetStateAction } from 'preact/compat'

let setDieTransform: Dispatch<SetStateAction<{ x: number; y: number; rotation: number }>> | null =
  null
let setDieTransformOrigin: Dispatch<SetStateAction<string>> | null = null

export function setDiePosition(x: number, y: number) {
  setDieTransform?.(({ rotation }) => ({ x, y, rotation }))
  setDieTransformOrigin?.(`${x + 50}px ${y + 50}px`)
}

export function DieGroup() {
  const dieElement = useRef<SVGGElement>(null)

  if (!gameState.value?.dieRoll) return null

  const { x, y, rotation } = randomOffsetAndRotation()
  const [transform, setTransform] = useState({ x, y, rotation })
  const [transformOrigin, setTransformOrigin] = useState(`${x + 50}px ${y + 50}px`)

  setDieTransform = setTransform
  setDieTransformOrigin = setTransformOrigin

  return (
    <Group
      ref={dieElement}
      onClick={(e: PointerEvent) => {
        e.stopPropagation()
        const diePit = gameState.value!.diePit
        setTransform({ x: diePit.x * 100, y: diePit.y * 100, rotation: 0 })
        setTransformOrigin(`0 0`)
      }}
      style={{
        transform: `rotate(${transform.rotation}deg) translate(${transform.x}px, ${transform.y}px)`,
        transformOrigin,
        cursor: 'pointer',
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

const rollDie = keyframes`
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
  
`

const Group = styled('g')`
  animation: ${rollDie} 1s cubic-bezier(0.22, 0.61, 0.36, 1);
`
