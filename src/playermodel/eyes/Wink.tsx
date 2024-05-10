import { ModelProps } from '../types'

export function Wink(_: ModelProps) {
  return (
    <g>
      <circle cx={-7} cy={-4} r={3} fill={'black'} />

      <path
        d='m 0 0 c 2 -2 3 -2 6 0'
        style={{
          strokeWidth: 3,
          stroke: 'black',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none',
          transform: 'translate(3px, -3px)',
        }}
      />
    </g>
  )
}
