import { ModelProps } from '../types'

export function Glasses(_: ModelProps) {
  return (
    <g>
      <circle cx={10} cy={-4} r={3} fill={'black'} />
      <circle cx={10} cy={-4} r={6} fill={'none'} style={{ stroke: 'black', strokeWidth: 3 }} />
      <circle cx={-10} cy={-4} r={3} fill={'black'} />
      <circle cx={-10} cy={-4} r={6} fill={'none'} style={{ stroke: 'black', strokeWidth: 3 }} />

      <line
        x1={2}
        x2={-2}
        y1={-4}
        y2={-4}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
