import { ModelProps } from '../types'

export function Sad(_: ModelProps) {
  return (
    <g>
      <circle cx={7} cy={-4} r={3} fill={'black'} />
      <circle cx={-7} cy={-4} r={3} fill={'black'} />
      <line
        x1={12}
        x2={6}
        y1={-6}
        y2={-8}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-12}
        x2={-6}
        y1={-6}
        y2={-8}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
