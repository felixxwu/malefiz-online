import { ModelProps } from '../types'

export function Confused(_: ModelProps) {
  return (
    <g>
      <circle cx={7} cy={-4} r={3} fill={'black'} />
      <circle cx={-7} cy={-4} r={3} fill={'black'} />
      <line
        x1={12}
        x2={5}
        y1={-12}
        y2={-11}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-12}
        x2={-5}
        y1={-8}
        y2={-7}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
