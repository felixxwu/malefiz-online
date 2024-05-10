import { ModelProps } from '../types'

export function Sunglasses(_: ModelProps) {
  return (
    <g>
      <path
        d='M -13 -7 C -15 -5 -8 7 -2 -6 L 2 -6 C 8 7 15 -5 13 -7 Q 0 -5 -13 -7 Z'
        style={{
          strokeWidth: 2,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'black',
          transform: 'scale(1.1)',
        }}
      />
    </g>
  )
}
