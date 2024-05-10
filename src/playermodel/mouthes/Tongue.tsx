import { ModelProps } from '../types'

export function Tongue(_: ModelProps) {
  return (
    <g>
      <path
        d='m 0 0 l 15 0 L 11 0 c 0 10 -6 7 -6 0'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
          transform: 'translate(-8px, 7px)',
        }}
      />
    </g>
  )
}
