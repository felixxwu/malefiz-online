import { ModelProps } from '../types'

export function Fangs(_: ModelProps) {
  return (
    <g>
      <path
        d='m 2 1 l -1 2 l -1 -3 q 8 4 16 0 l -1 3 l -1 -2'
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
