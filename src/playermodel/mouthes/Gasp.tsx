import { ModelProps } from '../types'

export function Gasp(_: ModelProps) {
  return (
    <g>
      <path
        d='M -5 10 q 5 -10 10 0 Z'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
        }}
      />
    </g>
  )
}
