import { ModelProps } from '../types'

export function Lips(_: ModelProps) {
  return (
    <g>
      <path
        d='m 0 0 c 4 -1 7 5 0 5 c 6 0 4 6 0 5'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
          transform: 'translate(-1px, 3px)',
        }}
      />
    </g>
  )
}
