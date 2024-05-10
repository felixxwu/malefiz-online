import { ModelProps } from '../types'

export function Smirk(_: ModelProps) {
  return (
    <g>
      <path
        d='m 0 0 c 5 0 15 1 15 -3'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
          transform: 'translate(-7px, 8px)',
        }}
      />
    </g>
  )
}
