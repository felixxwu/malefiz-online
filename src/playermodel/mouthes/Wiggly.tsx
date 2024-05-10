import { ModelProps } from '../types'

export function Wiggly(_: ModelProps) {
  return (
    <g>
      <path
        d='m 0 0 q 2 -2 4 0 q 2 2 4 0 q 2 -2 4 0 q 2 2 4 0 Q 18 -2 20 0'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
          transform: 'translate(-10px, 8px)',
        }}
      />
    </g>
  )
}
